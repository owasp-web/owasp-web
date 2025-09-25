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
  // Determine if super admin
  const { data: superRows } = await supabase
    .from('global_admins')
    .select('id')
    .or(`user_id.eq.${data.user.id},email.eq.${(data.user as any).email}`)
    .limit(1)
  const isSuperAdmin = !!(superRows && superRows.length > 0)
  return { user: data.user as any, error: null, isSuperAdmin }
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
  const { user, error, isSuperAdmin } = await requireAuthenticatedUser(req) as any
  if (!user) {
    return NextResponse.json({ error }, { status: 401 })
  }
  if (!isSuperAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { chapterId } = context.params
  const body = await req.json().catch(() => ({}))
  const email = (body?.email || '').toString().trim().toLowerCase()
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const supabase = createServerComponentClient()

  // Create user with random password if not exists, otherwise proceed
  let userId: string | null = null
  let tempPassword: string | null = null
  try {
    // Try to get existing user by email
    const { data: existing, error: getErr } = await supabase.auth.admin.listUsers()
    if (!getErr) {
      const match = (existing?.users || []).find((u: any) => (u?.email || '').toLowerCase() === email)
      if (match?.id) {
        userId = match.id
      }
    }

    if (!userId) {
      // Generate a strong temp password
      const random = Math.random().toString(36).slice(-10)
      const random2 = Math.random().toString(36).slice(-10)
      tempPassword = `Owasp!${random}${random2}`
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || ''
      const redirectTo = siteUrl ? `${siteUrl}/auth/callback` : undefined
      const { data: created, error: createErr } = await supabase.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: { invited_as: 'chapter_admin' }
      } as any)
      if (createErr) {
        // Fallback: invite if creation blocked by existing email
        const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, { redirectTo })
        if (inviteError && !inviteError.message?.toLowerCase().includes('user already registered')) {
          return NextResponse.json({ error: inviteError.message }, { status: 400 })
        }
        if (inviteData?.user?.id) userId = inviteData.user.id
      } else if (created?.user?.id) {
        userId = created.user.id
      }
    }
  } catch (e: any) {
    // continue; userId may remain null
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

  return NextResponse.json({ admin: data, tempPassword })
}

export async function DELETE(req: NextRequest, context: { params: { chapterId: string } }) {
  const { user, error, isSuperAdmin } = await requireAuthenticatedUser(req) as any
  if (!user) {
    return NextResponse.json({ error }, { status: 401 })
  }
  if (!isSuperAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
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


