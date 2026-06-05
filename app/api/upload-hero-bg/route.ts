import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Use JPG, PNG, or WEBP.' }, { status: 400 })
    }

    const extension = file.name.split('.').pop()
    const fileName = `hero-bg.${extension}`

    const { error: uploadError } = await supabaseAdmin.storage
      .from('site-assets')
      .upload(fileName, file, { upsert: true, contentType: file.type })

    if (uploadError) throw uploadError

    const { data: urlData } = supabaseAdmin.storage.from('site-assets').getPublicUrl(fileName)
    const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`

    const { error: dbError } = await supabaseAdmin
      .from('settings')
      .upsert({ key: 'hero_image_url', value: publicUrl }, { onConflict: 'key' })

    if (dbError) throw dbError

    return NextResponse.json({ success: true, url: publicUrl })
  } catch (error) {
    console.error('Error uploading hero bg:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}