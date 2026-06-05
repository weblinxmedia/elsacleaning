import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    // Safety check: If an admin already exists, block this route
    const { data: existingUsers } = await supabaseAdmin
      .from('admin_users')
      .select('id')
      .limit(1)

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json({ error: 'Admin already exists. Setup is locked.' }, { status: 403 })
    }

    const { email, password } = await req.json()

    if (!email || !password || password.length < 8) {
      return NextResponse.json({ error: 'Email and password (min 8 chars) required.' }, { status: 400 })
    }

    // Hash the password securely
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // Save to database
    const { error } = await supabaseAdmin
      .from('admin_users')
      .insert([{ email, password_hash: passwordHash }])

    if (error) throw error

    return NextResponse.json({ success: true, message: 'Admin created successfully!' })
  } catch (error) {
    console.error('Setup Error:', error)
    return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 })
  }
}