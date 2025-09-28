import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

function getBearerToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) return null
  return authHeader.split(' ')[1]
}

async function requireSuper(req: NextRequest) {
  const token = getBearerToken(req)
  if (!token) return { error: 'Unauthorized' }
  const svc = createServerComponentClient()
  const { data: userData, error: userErr } = await svc.auth.getUser(token)
  if (userErr || !userData?.user) return { error: 'Unauthorized' }
  const email = (userData.user as any)?.email || ''
  const { data: superRows } = await svc
    .from('global_admins')
    .select('id')
    .or(`user_id.eq.${userData.user.id},email.eq.${email}`)
    .limit(1)
  const isSuperAdmin = !!(superRows && superRows.length > 0)
  if (!isSuperAdmin) return { error: 'Forbidden' }
  return { svc }
}

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const check = await requireSuper(req)
  if ('error' in check) return NextResponse.json(check, { status: check.error === 'Forbidden' ? 403 : 401 })
  const { svc } = check
  const { id } = context.params
  const { data, error } = await svc.from('project_admins').select('*').eq('project_id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ admins: data || [] })
}

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  const check = await requireSuper(req)
  if ('error' in check) return NextResponse.json(check, { status: check.error === 'Forbidden' ? 403 : 401 })
  const { svc } = check
  const { id } = context.params
  const body = await req.json().catch(() => ({}))
  const email = (body?.email || '').toString().trim().toLowerCase()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
  const { data, error } = await svc
    .from('project_admins')
    .insert({ project_id: id, email })
    .select('*')
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ admin: data })
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const check = await requireSuper(req)
  if ('error' in check) return NextResponse.json(check, { status: check.error === 'Forbidden' ? 403 : 401 })
  const { svc } = check
  const { id } = context.params
  const body = await req.json().catch(() => ({}))
  const email = (body?.email || '').toString().trim().toLowerCase()
  const adminId = (body?.id || '').toString().trim()
  let q = svc.from('project_admins').delete().eq('project_id', id)
  if (adminId) q = q.eq('id', adminId)
  if (email) q = q.eq('email', email)
  const { error } = await q
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}


