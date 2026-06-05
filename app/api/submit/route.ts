import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { resend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, service, address, message, source } = body

    if (!name || !email || !phone || !service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Save to database
    const { error: dbError } = await supabaseAdmin
      .from('leads')
      .insert([{
        name,
        email,
        phone,
        service,
        address: address || '',
        message: message || '',
        source: source || 'website',
        status: 'new',
      }])

    if (dbError) {
      console.error('Lead save error:', dbError)
      return NextResponse.json({ error: `DB Error: ${dbError.message}` }, { status: 500 })
    }

    // 2. Fetch the correct admin email from your settings table
    const { data: emailData } = await supabaseAdmin
      .from('settings')
      .select('value')
      .eq('key', 'admin_email')
      .single()

    const adminEmail = emailData?.value || process.env.ADMIN_EMAIL

    // 3. Send email notification
    if (resend && adminEmail) {
      await resend.emails.send({
        from: 'Pink Ladies <onboarding@resend.dev>',
        to: [adminEmail],
        subject: `New Lead: ${name} - ${service}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0f172a;">New Lead Received!</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${name}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${email}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${phone}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Service:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${service}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Address:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${address || 'N/A'}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Source:</td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${source || 'website'}</td></tr>
            </table>
            ${message ? `<p style="margin-top: 16px;"><strong>Message:</strong><br/>${message}</p>` : ''}
          </div>
        `,
      })
    } else {
      console.log('⚠️ Resend not configured or admin email missing.')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}