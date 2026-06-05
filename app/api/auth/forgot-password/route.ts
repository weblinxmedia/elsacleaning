import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { resend } from '@/lib/resend'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

    const { data: emailData } = await supabaseAdmin.from('settings').select('value').eq('key', 'admin_email').single()
    const adminEmail = emailData?.value || process.env.ADMIN_EMAIL

    if (email !== adminEmail) {
      return NextResponse.json({ success: true, message: 'If that email exists, a reset link has been sent.' })
    }

    const token = crypto.randomBytes(32).toString('hex')

    // Save token as a key-value row
    await supabaseAdmin.from('settings').upsert([{ key: 'reset_token', value: token }], { onConflict: 'key' })

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${req.headers.get('host')}`
    const resetLink = `${baseUrl}/admin/reset-password?token=${token}`

    if (resend) {
      await resend.emails.send({
        from: 'Pink Ladies <onboarding@resend.dev>',
        to: [adminEmail],
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset.</p><p>Click <a href="${resetLink}">here</a> to set a new password. This link expires in 1 hour.</p><p>If you did not request this, ignore this email.</p>`,
      })
    }

    return NextResponse.json({ success: true, message: 'If that email exists, a reset link has been sent.' })
  } catch (error) {
    console.error('Forgot Password Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}