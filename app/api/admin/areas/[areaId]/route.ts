import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ areaId: string }> }) {
  const { areaId } = await params
  try {
    const { error } = await supabaseAdmin
      .from('areas')
      .delete()
      .eq('id', areaId)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete area error:', error)
    return NextResponse.json({ error: 'Failed to delete area' }, { status: 500 })
  }
}