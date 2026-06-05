import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const [packagesRes, addonsRes] = await Promise.all([
      supabaseAdmin.from('pricing_packages').select('*').order('created_at', { ascending: true }),
      supabaseAdmin.from('pricing_addons').select('*').order('created_at', { ascending: true })
    ])

    return NextResponse.json({
      packages: packagesRes.data || [],
      addons: addonsRes.data || []
    })
  } catch (error) {
    console.error('Pricing fetch error:', error)
    return NextResponse.json({ packages: [], addons: [] })
  }
}