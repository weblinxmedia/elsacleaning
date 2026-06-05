import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('areas')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Admin fetch areas error:', error)
    return NextResponse.json({ error: 'Failed to fetch areas' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, slug, address } = await req.json()
    
    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('areas')
      .insert([{ name, slug, address: address || '' }])

    if (error) {
      console.error('Add area error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Add area crash:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}