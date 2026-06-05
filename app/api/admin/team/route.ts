import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { name, role, photo_url } = await req.json()

    const { error } = await supabaseAdmin
      .from('team_members')
      .insert([{ name, role, photo_url, is_active: true }])

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Add member error:', error)
    return NextResponse.json({ error: 'Failed to add member' }, { status: 500 })
  }
}