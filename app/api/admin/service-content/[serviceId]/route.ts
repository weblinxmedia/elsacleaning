import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest, { params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params
  try {
    const { data, error } = await supabaseAdmin
      .from('service_page_contents')
      .select('*')
      .eq('service_id', serviceId)
      .single()

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) return NextResponse.json({})

    // Remove internal DB columns
    delete data.id
    delete data.created_at
    delete data.service_id

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({})
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params
  try {
    const body = await req.json()

    // Clean up internal fields
    delete body.id
    delete body.created_at
    delete body.service_id

    // Save the flat fields directly to the row
    const { error } = await supabaseAdmin
      .from('service_page_contents')
      .upsert({
        service_id: serviceId,
        ...body
      }, { onConflict: 'service_id' })

    if (error) {
      console.error('Save error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PUT crash:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}