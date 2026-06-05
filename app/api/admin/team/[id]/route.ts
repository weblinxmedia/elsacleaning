import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PUT(req: NextRequest, context: any) {
  try {
    const params = context.params instanceof Promise ? await context.params : context.params
    const { id } = params
    const body = await req.json()

    const { error } = await supabaseAdmin
      .from('team_members')
      .update(body)
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PUT crash:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    const params = context.params instanceof Promise ? await context.params : context.params
    const { id } = params

    const { error } = await supabaseAdmin
      .from('team_members')
      .delete()
      .eq('id', id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE crash:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}