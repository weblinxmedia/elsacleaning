import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // Fetch email and password from key-value rows
    const { data: emailData } = await supabaseAdmin.from('settings').select('value').eq('key', 'admin_email').single()
    const { data: passData } = await supabaseAdmin.from('settings').select('value').eq('key', 'admin_password').single()

    const validEmail = emailData?.value || process.env.ADMIN_EMAIL
    const validPassword = passData?.value || process.env.ADMIN_PASSWORD

    if (!validEmail || !validPassword) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    if (email === validEmail && password === validPassword) {
      const response = NextResponse.json({ success: true })
      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: req.url.startsWith('https'),
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
      return response
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}