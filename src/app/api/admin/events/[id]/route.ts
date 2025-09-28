import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

function getBearerToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) return null
  return authHeader.split(' ')[1]
}

async function getCallerContext(req: NextRequest) {
  const token = getBearerToken(req)
  if (!token) return { error: 'Missing Authorization header' }
  const svc = createServerComponentClient()
  const { data: userData, error } = await svc.auth.getUser(token)
  if (error || !userData?.user) return { error: 'Unauthorized' }
  const email = (userData.user as any)?.email || ''
  // super admin?
  const { data: superRows } = await svc
    .from('global_admins')
    .select('id')
    .or(`user_id.eq.${userData.user.id},email.eq.${email}`)
    .limit(1)
  const isSuperAdmin = !!(superRows && superRows.length > 0)
  return { svc, user: userData.user, email, isSuperAdmin }
}

function forbid() {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const ctx = await getCallerContext(req)
  if ('error' in ctx) return NextResponse.json({ error: ctx.error }, { status: 401 })
  const { svc, user, email, isSuperAdmin } = ctx
  const { id } = context.params

  const { data: ev, error } = await svc.from('events').select('*').eq('id', id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })

  if (!isSuperAdmin) {
    const { data: ca } = await svc
      .from('chapter_admins')
      .select('id')
      .eq('chapter_id', (ev as any).chapter_id)
      .or(`user_id.eq.${(user as any).id},email.eq.${email}`)
      .limit(1)
    if (!ca || ca.length === 0) return forbid()
  }

  return NextResponse.json({ event: ev })
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const ctx = await getCallerContext(req)
  if ('error' in ctx) return NextResponse.json({ error: ctx.error }, { status: 401 })
  const { svc, user, email, isSuperAdmin } = ctx
  const { id } = context.params

  const body = await req.json().catch(() => ({}))
  delete body.id
  delete body.created_at

  // Load current event to authorize against its chapter_id
  const { data: current, error: curErr } = await svc.from('events').select('*').eq('id', id).single()
  if (curErr) return NextResponse.json({ error: curErr.message }, { status: 404 })

  const chapterId = body.chapter_id ?? (current as any).chapter_id

  if (!isSuperAdmin) {
    const { data: ca } = await svc
      .from('chapter_admins')
      .select('id')
      .eq('chapter_id', chapterId)
      .or(`user_id.eq.${(user as any).id},email.eq.${email}`)
      .limit(1)
    if (!ca || ca.length === 0) return forbid()
  }

  const { data, error } = await svc
    .from('events')
    .update(body)
    .eq('id', id)
    .select('*')
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ event: data })
}


