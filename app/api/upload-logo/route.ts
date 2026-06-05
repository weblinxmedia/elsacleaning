import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Basic validation for image types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Use JPG, PNG, SVG, or WEBP.' }, { status: 400 })
    }

    // We'll always name it the same thing (with its extension) so it overwrites the old logo
    const extension = file.name.split('.').pop()
    const fileName = `logo.${extension}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from('site-assets')
      .upload(fileName, file, {
        upsert: true, // Overwrite if it already exists
        contentType: file.type,
      })

    if (uploadError) throw uploadError

    // Get the Public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('site-assets')
      .getPublicUrl(fileName)

    // Add a timestamp to force browsers to refresh the image (cache busting)
    const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`

    // Save the new URL back to the settings table
    const { error: dbError } = await supabaseAdmin
      .from('settings')
      .upsert({ key: 'logo_url', value: publicUrl }, { onConflict: 'key' })

    if (dbError) throw dbError

    return NextResponse.json({ success: true, url: publicUrl })
  } catch (error) {
    console.error('Error uploading logo:', error)
    return NextResponse.json({ error: 'Failed to upload logo' }, { status: 500 })
  }
}