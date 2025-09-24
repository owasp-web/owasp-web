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

export async function POST(req: NextRequest, context: { params: { chapterId: string } }) {
  const { user, error } = await requireAuthenticatedUser(req)
  if (!user) {
    return NextResponse.json({ error }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const email = (body?.email || '').toString().trim().toLowerCase()
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const supabase = createServerComponentClient()

  // Find user id from chapter_admins or auth users
  let userId: string | null = null
  const { data: caRows } = await supabase
    .from('chapter_admins')
    .select('user_id')
    .eq('email', email)
    .limit(1)
    .single()
  if (caRows?.user_id) {
    userId = caRows.user_id as string
  }
  if (!userId) {
    const { data: list } = await (supabase as any).auth.admin.listUsers()
    const match = list?.users?.find((u: any) => (u?.email || '').toLowerCase() === email)
    if (match?.id) userId = match.id
  }

  if (!userId) {
    return NextResponse.json({ error: 'User not found for that email' }, { status: 404 })
  }

  // Generate strong temporary password and set it
  const rand = Math.random().toString(36).slice(-10)
  const rand2 = Math.random().toString(36).slice(-10)
  const tempPassword = `Owasp!${rand}${rand2}`

  const { error: updErr } = await (supabase as any).auth.admin.updateUserById(userId, {
    password: tempPassword,
    email_confirm: true
  })
  if (updErr) {
    return NextResponse.json({ error: updErr.message }, { status: 500 })
  }

  return NextResponse.json({ tempPassword })
}


