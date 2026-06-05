import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { currentPassword, newEmail, newPassword } = await req.json()

    if (!currentPassword) {
      return NextResponse.json({ error: 'Current password is required.' }, { status: 400 })
    }

    // Get current password from key-value row
    const { data: passData } = await supabaseAdmin.from('settings').select('value').eq('key', 'admin_password').single()
    const validPassword = passData?.value || process.env.ADMIN_PASSWORD

    if (currentPassword !== validPassword) {
      return NextResponse.json({ error: 'Incorrect current password.' }, { status: 401 })
    }

    // Upsert the new email/password as key-value rows
    const updates = []
    if (newEmail) updates.push({ key: 'admin_email', value: newEmail })
    if (newPassword) updates.push({ key: 'admin_password', value: newPassword })

    if (updates.length > 0) {
      const { error } = await supabaseAdmin.from('settings').upsert(updates, { onConflict: 'key' })
      if (error) {
        console.error('Update Error:', error)
        return NextResponse.json({ error: 'Failed to update credentials' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Account update crash:', error)
    return NextResponse.json({ error: 'Server crashed during update.' }, { status: 500 })
  }
}