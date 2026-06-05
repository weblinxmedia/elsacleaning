import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET all services (Admin)
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('services')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching admin services:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

// POST a new service (Admin)
export async function POST(req: NextRequest) {
  try {
    const { label, value } = await req.json()

    if (!label || !value) {
      return NextResponse.json({ error: 'Label and value are required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('services')
      .insert([{ label, value, is_active: true }])
      .select()

    if (error) throw error

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}