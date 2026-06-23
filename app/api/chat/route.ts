import { streamText, UIMessage, convertToModelMessages, tool, stepCountIs } from 'ai'
import { google } from '@ai-sdk/google'
import { z } from 'zod'
import { buildSystemPrompt } from '@/lib/knowledge-base'
import { supabaseAdmin } from '@/lib/supabase'
import { resend } from '@/lib/resend'

// ─── In-Memory Rate Limiter ───────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 20 // requests per window
const RATE_WINDOW_MS = 60 * 1000 // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT) {
    return false
  }

  entry.count++
  return true
}

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) rateLimitMap.delete(key)
  }
}, 5 * 60 * 1000)

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || 'unknown'

    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait a moment.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { messages }: { messages: UIMessage[] } = await req.json()

    // Build system prompt with live data
    const systemPrompt = await buildSystemPrompt()

    // OPTIMIZATION: Only send the last 10 messages to save API credits and reduce token usage.
    // As conversations get longer, sending the entire history multiplies your token usage rapidly.
    const recentMessages = messages.slice(-10)

    const result = streamText({
      model: google('gemini-1.5-flash'), // 1.5-flash is extremely fast and cost-effective
      system: systemPrompt,
      messages: await convertToModelMessages(recentMessages),
      stopWhen: stepCountIs(3),
      tools: {
        capture_service_lead: tool({
          description:
            'Capture a qualified service lead when the user has provided their name, email, and service interest during the conversation. Only call this after naturally gathering the required information.',
          inputSchema: z.object({
            fullName: z.string().describe('The full name of the prospective client'),
            emailAddress: z.string().email().describe('The email address of the prospective client'),
            phoneNumber: z.string().describe('The phone number of the client'),
            address: z.string().describe("The client's address or city/neighborhood"),
            serviceRequested: z.string().describe('The cleaning service they are interested in'),
            bestTimeToCall: z.string().describe('The best day and time to call them back'),
            propertySpecs: z.string().optional().describe('Property details like size, stories, special requirements'),
          }),
          execute: async ({ fullName, emailAddress, phoneNumber, address, serviceRequested, bestTimeToCall, propertySpecs }) => {
            try {
              const fullMessage = `Best time to call: ${bestTimeToCall}\n\nProperty Specs: ${propertySpecs || 'None'}`;

              // Route through the EXISTING lead pipeline (same as /api/submit)
              const { error: dbError } = await supabaseAdmin
                .from('leads')
                .insert([{
                  name: fullName,
                  email: emailAddress,
                  phone: phoneNumber,
                  service: serviceRequested,
                  address: address,
                  message: fullMessage,
                  source: 'AI_Concierge',
                  status: 'new',
                }])

              if (dbError) {
                console.error('AI Lead save error:', dbError)
                return { success: false, error: 'Failed to save lead' }
              }

              // Send email notification (same logic as /api/submit)
              const { data: emailData } = await supabaseAdmin
                .from('settings')
                .select('value')
                .eq('key', 'admin_email')
                .single()

              const adminEmail = emailData?.value || process.env.ADMIN_EMAIL

              if (resend && adminEmail) {
                await resend.emails.send({
                  from: 'Shazam Cleaning <onboarding@resend.dev>',
                  to: [adminEmail],
                  subject: `AI Concierge Lead: ${fullName} - ${serviceRequested}`,
                  html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                      <h2 style="color: #0f172a;">🤖 New Lead from AI Concierge</h2>
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${fullName}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${emailAddress}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${phoneNumber}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Address:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${address}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Time to Call:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${bestTimeToCall}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Service:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${serviceRequested}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Source:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">AI Concierge</td></tr>
                      </table>
                      ${propertySpecs ? `<p style="margin-top: 16px;"><strong>Property Specs:</strong><br/>${propertySpecs}</p>` : ''}
                    </div>
                  `,
                })
              }

              return { success: true, clientName: fullName, clientEmail: emailAddress }
            } catch (error) {
              console.error('AI lead capture error:', error)
              return { success: false, error: 'An error occurred while processing the lead' }
            }
          },
        }),
      },
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({ error: 'An error occurred processing your request.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

// Force Turbopack hot reload
