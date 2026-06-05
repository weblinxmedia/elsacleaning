import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) return NextResponse.json({ error: 'Token and new password are required' }, { status: 400 })
    if (password.length < 8) return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })

    // Get the saved token
    const { data: tokenData } = await supabaseAdmin.from('settings').select('value').eq('key', 'reset_token').single()

    if (!tokenData || tokenData.value !== token) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
    }

    // Update password and clear token
    const { error } = await supabaseAdmin.from('settings').upsert([
      { key: 'admin_password', value: password },
      { key: 'reset_token', value: '' }
    ], { onConflict: 'key' })

    if (error) {
      return NextResponse.json({ error: 'Failed to update password' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Reset password crash:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}