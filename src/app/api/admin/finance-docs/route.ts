import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getBearerToken(req: NextRequest) {
  const h = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!h || !h.toLowerCase().startsWith('bearer ')) return null
  return h.split(' ')[1]
}

async function requireSuperAdmin(req: NextRequest) {
  const token = getBearerToken(req)
  if (!token) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return { error: NextResponse.json({ error: 'Server not configured' }, { status: 500 }) }
  const svc = createClient(url, key)
  const { data: userData, error: userErr } = await svc.auth.getUser(token)
  if (userErr || !userData?.user) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  const email = (userData.user as any)?.email || ''
  const { data: rows } = await svc
    .from('global_admins')
    .select('id')
    .or(`user_id.eq.${userData.user.id},email.eq.${email}`)
    .limit(1)
  if (!rows || rows.length === 0) return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  return { svc }
}

export async function GET(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    const svc = createClient(url, key)
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    let q = svc.from('finance_documents').select('*').order('display_order', { ascending: true }).order('year', { ascending: false }).order('created_at', { ascending: false })
    if (category) q = q.eq('category', category)
    const { data, error } = await q
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ documents: data })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireSuperAdmin(req)
  if ('error' in auth) return auth.error
  const svc = auth.svc
  try {
    const body = await req.json().catch(() => ({}))
    const { name, category, year, file_url, storage_path, display_order } = body || {}
    if (!name || !category || !file_url) {
      return NextResponse.json({ error: 'name, category, and file_url are required' }, { status: 400 })
    }
    const { data, error } = await svc
      .from('finance_documents')
      .insert([{ name, category, year: year ?? null, file_url, storage_path: storage_path ?? null, display_order: display_order ?? 0 }])
      .select('*')
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ document: data })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


