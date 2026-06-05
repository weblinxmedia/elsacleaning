import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PUT(req: NextRequest, context: any) {
  const { id } = context.params instanceof Promise ? await context.params : context.params
  const body = await req.json()
  const { error } = await supabaseAdmin.from('pricing_addons').update(body).eq('id', id)
  if (error) throw error
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params instanceof Promise ? await context.params : context.params
  const { error } = await supabaseAdmin.from('pricing_addons').delete().eq('id', id)
  if (error) throw error
  return NextResponse.json({ success: true })
}