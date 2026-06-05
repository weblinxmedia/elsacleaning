import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('key, value')

    if (error || !data) return NextResponse.json({})
    
    // Flatten rows into a single object: { site_name: '...', logo_url: '...' }
    const settings: Record<string, string> = {}
    data.forEach((item: { key: string; value: string }) => {
      settings[item.key] = item.value
    })
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error('GET Settings Error:', error)
    return NextResponse.json({})
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Remove temporary frontend fields
    delete body._newEmail
    delete body._newPassword
    delete body._currentPassword
    delete body.id
    delete body.created_at

    // Convert the object into an array of rows for Supabase
    const rows = Object.entries(body).map(([key, value]) => ({
      key,
      value: String(value || '')
    }))

    // Upsert all rows at once (creates them if they don't exist, updates if they do)
    const { error } = await supabaseAdmin
      .from('settings')
      .upsert(rows, { onConflict: 'key' })

    if (error) {
      console.error('PUT Settings Error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PUT Settings Crash:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}