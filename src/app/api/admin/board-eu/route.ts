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
  const { data: tabs } = await svc.from('board_eu_tabs').select('*').order('display_order', { ascending: true })
  const { data: members } = await svc.from('board_eu_members').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: false })
  return NextResponse.json({ tabs: tabs || [], members: members || [] })
}

export async function POST(req: NextRequest) {
  const auth = await requireSuperAdmin(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { svc } = auth
  const body = await req.json().catch(() => ({}))
  if (body.entity === 'tab') {
    const { name, content, display_order } = body
    const { data, error } = await svc.from('board_eu_tabs').insert({ name, content, display_order: display_order || 0 }).select('*').single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ tab: data })
  }
  if (body.entity === 'member') {
    const { name, title, description, image_url, storage_path, links, country, display_order, is_active } = body
    const { data, error } = await svc.from('board_eu_members').insert({ name, title, description, image_url, storage_path, links, country, display_order: display_order || 0, is_active: is_active !== false }).select('*').single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ member: data })
  }
  return NextResponse.json({ error: 'Invalid entity' }, { status: 400 })
}

export async function PUT(req: NextRequest) {
  const auth = await requireSuperAdmin(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { svc } = auth
  const body = await req.json().catch(() => ({}))
  if (body.entity === 'tab' && body.id) {
    const { id, name, content, display_order } = body
    const { data, error } = await svc.from('board_eu_tabs').update({ name, content, display_order }).eq('id', id).select('*').single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ tab: data })
  }
  if (body.entity === 'member' && body.id) {
    const { id, name, title, description, image_url, storage_path, links, country, display_order, is_active } = body
    const { data, error } = await svc.from('board_eu_members').update({ name, title, description, image_url, storage_path, links, country, display_order, is_active }).eq('id', id).select('*').single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ member: data })
  }
  return NextResponse.json({ error: 'Invalid entity or id' }, { status: 400 })
}

export async function DELETE(req: NextRequest) {
  const auth = await requireSuperAdmin(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { svc } = auth
  const { searchParams } = new URL(req.url)
  const entity = searchParams.get('entity')
  const id = searchParams.get('id')
  if (!entity || !id) return NextResponse.json({ error: 'entity and id are required' }, { status: 400 })
  if (entity === 'tab') {
    const { error } = await svc.from('board_eu_tabs').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ ok: true })
  }
  if (entity === 'member') {
    const { error } = await svc.from('board_eu_members').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ ok: true })
  }
  return NextResponse.json({ error: 'Invalid entity' }, { status: 400 })
}


