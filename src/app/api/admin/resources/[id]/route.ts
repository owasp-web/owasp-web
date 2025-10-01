import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

function getBearerToken(req: NextRequest) {
  const h = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!h || !h.toLowerCase().startsWith('bearer ')) return null
  return h.split(' ')[1]
}

async function requireSuperAdmin(req: NextRequest) {
  const token = getBearerToken(req)
  if (!token) return { error: 'Unauthorized', status: 401 as const }
  const svc = createServerComponentClient()
  const { data: userData, error: userErr } = await svc.auth.getUser(token)
  if (userErr || !userData?.user) return { error: 'Unauthorized', status: 401 as const }
  const email = (userData.user as any)?.email || ''
  const { data: superRows } = await svc
    .from('global_admins')
    .select('id')
    .or(`user_id.eq.${(userData.user as any).id},email.eq.${email}`)
    .limit(1)
  const isSuperAdmin = !!(superRows && superRows.length > 0)
  if (!isSuperAdmin) return { error: 'Forbidden', status: 403 as const }
  return { svc }
}

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const auth = await requireSuperAdmin(req)
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status })
  const { svc } = auth
  const { data, error } = await svc.from('resources').select('*').eq('id', context.params.id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json({ resource: data })
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const auth = await requireSuperAdmin(req)
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status })
  const { svc } = auth
  const body = await req.json().catch(() => ({}))
  delete body.id; delete body.created_at; delete body.updated_at
  const { data: current, error: curErr } = await svc.from('resources').select('*').eq('id', context.params.id).single()
  if (curErr) return NextResponse.json({ error: curErr.message }, { status: 404 })
  const allowed = new Set(Object.keys(current || {}))
  const sanitized: Record<string, any> = {}
  for (const [k, v] of Object.entries(body)) {
    if (allowed.has(k) && v !== undefined) sanitized[k] = v
  }
  const { data, error } = await svc.from('resources').update(sanitized).eq('id', context.params.id).select('*').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ resource: data })
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const auth = await requireSuperAdmin(req)
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status })
  const { svc } = auth
  const { error } = await svc.from('resources').delete().eq('id', context.params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}


