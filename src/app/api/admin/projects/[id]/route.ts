import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

function getBearerToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) return null
  return authHeader.split(' ')[1]
}

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const token = getBearerToken(req)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const svc = createServerComponentClient()
  const { data: userData, error: userErr } = await svc.auth.getUser(token)
  if (userErr || !userData?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const email = (userData.user as any)?.email || ''
  const { data: superRows } = await svc
    .from('global_admins')
    .select('id')
    .or(`user_id.eq.${userData.user.id},email.eq.${email}`)
    .limit(1)

  const isSuperAdmin = !!(superRows && superRows.length > 0)
  if (!isSuperAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = context.params
  const { data, error } = await svc
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })

  return NextResponse.json({ project: data })
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const token = getBearerToken(req)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const svc = createServerComponentClient()
  const { data: userData, error: userErr } = await svc.auth.getUser(token)
  if (userErr || !userData?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const email = (userData.user as any)?.email || ''
  const { data: superRows } = await svc
    .from('global_admins')
    .select('id')
    .or(`user_id.eq.${(userData.user as any).id},email.eq.${email}`)
    .limit(1)

  const isSuperAdmin = !!(superRows && superRows.length > 0)
  if (!isSuperAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = context.params
  const body = await req.json().catch(() => ({}))
  delete body.id
  delete body.created_at
  delete body.updated_at

  // Load current to limit to valid columns only
  const { data: current, error: curErr } = await svc.from('projects').select('*').eq('id', id).single()
  if (curErr) return NextResponse.json({ error: curErr.message }, { status: 404 })
  const allowed = new Set(Object.keys(current || {}))
  const sanitized: Record<string, any> = {}
  for (const [k, v] of Object.entries(body)) {
    if (allowed.has(k) && v !== undefined) sanitized[k] = v
  }

  // If tabs provided, ensure both columns are updated for compatibility
  if (body.tabs !== undefined) {
    sanitized.tabs = body.tabs
    // Mirror to custom_tabs column when present
    if (allowed.has('custom_tabs')) sanitized.custom_tabs = body.tabs
  }

  const { data, error } = await svc
    .from('projects')
    .update(sanitized)
    .eq('id', id)
    .select('*')
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ project: data })
}
