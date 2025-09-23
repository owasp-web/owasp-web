import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

async function requireAuthenticatedUser(req: NextRequest) {
  const supabase = createServerComponentClient()
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
    return { user: null, error: 'Missing Authorization header' }
  }
  const token = authHeader.split(' ')[1]
  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data?.user) {
    return { user: null, error: 'Invalid or expired token' }
  }
  return { user: data.user, error: null }
}

export async function GET(req: NextRequest, context: { params: { chapterId: string } }) {
  const { user, error } = await requireAuthenticatedUser(req)
  if (!user) {
    return NextResponse.json({ error }, { status: 401 })
  }

  const { chapterId } = context.params
  const supabase = createServerComponentClient()
  const { data, error: dbError } = await supabase
    .from('chapter_admins')
    .select('*')
    .eq('chapter_id', chapterId)
    .order('created_at', { ascending: false })

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  return NextResponse.json({ admins: data || [] })
}

export async function POST(req: NextRequest, context: { params: { chapterId: string } }) {
  const { user, error } = await requireAuthenticatedUser(req)
  if (!user) {
    return NextResponse.json({ error }, { status: 401 })
  }

  const { chapterId } = context.params
  const body = await req.json().catch(() => ({}))
  const email = (body?.email || '').toString().trim().toLowerCase()
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const supabase = createServerComponentClient()

  // Try to invite/create the user (idempotent if already exists)
  let userId: string | null = null
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || ''
    const redirectTo = siteUrl ? `${siteUrl}/auth/callback` : undefined
    const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo
    })
    if (inviteError) {
      // If invite fails because user exists, continue; otherwise surface error
      const isAlreadyRegistered = inviteError.message?.toLowerCase().includes('user already registered')
      if (!isAlreadyRegistered) {
        return NextResponse.json({ error: inviteError.message }, { status: 400 })
      }
    }
    if (inviteData?.user?.id) {
      userId = inviteData.user.id
    }
  } catch (e: any) {
    // Non-fatal; we can still add by email only
  }

  const { data, error: upsertError } = await supabase
    .from('chapter_admins')
    .upsert(
      { chapter_id: chapterId, email, user_id: userId },
      { onConflict: 'chapter_id,email' }
    )
    .select('*')
    .single()

  if (upsertError) {
    return NextResponse.json({ error: upsertError.message }, { status: 500 })
  }

  return NextResponse.json({ admin: data })
}

export async function DELETE(req: NextRequest, context: { params: { chapterId: string } }) {
  const { user, error } = await requireAuthenticatedUser(req)
  if (!user) {
    return NextResponse.json({ error }, { status: 401 })
  }

  const { chapterId } = context.params
  const body = await req.json().catch(() => ({}))
  const email = (body?.email || '').toString().trim().toLowerCase()
  const id = (body?.id || '').toString().trim()
  if (!email && !id) {
    return NextResponse.json({ error: 'Provide email or id to delete' }, { status: 400 })
  }

  const supabase = createServerComponentClient()
  const query = supabase.from('chapter_admins').delete().eq('chapter_id', chapterId)
  if (id) query.eq('id', id)
  if (email) query.eq('email', email)
  const { error: delError } = await query

  if (delError) {
    return NextResponse.json({ error: delError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}


