import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getBearerToken(req: NextRequest) {
  const h = req.headers.get('authorization') || ''
  if (!h.startsWith('Bearer ')) return ''
  return h.split(' ')[1]
}

async function requireSuperAdmin(req: NextRequest) {
  const token = getBearerToken(req)
  if (!token) return null
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  const svc = createClient(url, key)
  const { data: userData } = await svc.auth.getUser(token)
  const email = (userData?.user as any)?.email || ''
  const { data: rows } = await svc.from('global_admins').select('id').or(`user_id.eq.${userData?.user?.id},email.eq.${email}`).limit(1)
  if (!rows || rows.length === 0) return null
  return { svc }
}

export async function GET(req: NextRequest) {
  const auth = await requireSuperAdmin(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { svc } = auth
  const { data } = await svc.from('community_tabs').select('*').order('display_order', { ascending: true })
  return NextResponse.json({ tabs: data || [] })
}

export async function POST(req: NextRequest) {
  const auth = await requireSuperAdmin(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { svc } = auth
  const body = await req.json().catch(() => ({}))
  const { name, content, display_order } = body
  const { data, error } = await svc.from('community_tabs').insert({ name, content, display_order: display_order || 0 }).select('*').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ tab: data })
}

export async function PUT(req: NextRequest) {
  const auth = await requireSuperAdmin(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { svc } = auth
  const body = await req.json().catch(() => ({}))
  const { id, name, content, display_order } = body
  const { data, error } = await svc.from('community_tabs').update({ name, content, display_order }).eq('id', id).select('*').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ tab: data })
}

export async function DELETE(req: NextRequest) {
  const auth = await requireSuperAdmin(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { svc } = auth
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const { error } = await svc.from('community_tabs').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}


