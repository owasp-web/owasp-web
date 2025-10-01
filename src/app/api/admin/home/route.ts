import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

function getBearerToken(req: NextRequest) {
  const h = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!h || !h.toLowerCase().startsWith('bearer ')) return null
  return h.split(' ')[1]
}

async function requireSuper(req: NextRequest) {
  const token = getBearerToken(req)
  if (!token) return { error: 'Unauthorized', status: 401 as const }
  const svc = createServerComponentClient()
  const { data: userData, error } = await svc.auth.getUser(token)
  if (error || !userData?.user) return { error: 'Unauthorized', status: 401 as const }
  const email = (userData.user as any).email || ''
  const { data: superRows } = await svc.from('global_admins').select('id').or(`user_id.eq.${(userData.user as any).id},email.eq.${email}`).limit(1)
  const isSuper = !!(superRows && superRows.length > 0)
  if (!isSuper) return { error: 'Forbidden', status: 403 as const }
  return { svc }
}

export async function GET(req: NextRequest) {
  const auth = await requireSuper(req)
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status })
  const { svc } = auth
  const { data: settings } = await svc.from('home_settings').select('*').eq('id', 'global').single()
  const { data: slides } = await svc.from('home_slides').select('*').order('order_num', { ascending: true })
  return NextResponse.json({ settings, slides })
}

export async function PUT(req: NextRequest) {
  const auth = await requireSuper(req)
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status })
  const { svc } = auth
  const body = await req.json().catch(() => ({}))
  if (body.settings) {
    await svc.from('home_settings').upsert({ id: 'global', ...body.settings }).select('id').single()
  }
  if (Array.isArray(body.slides)) {
    // naive replace: delete then insert
    await svc.from('home_slides').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    if (body.slides.length) await svc.from('home_slides').insert(body.slides.map((s: any, i: number) => ({ ...s, order_num: s.order_num ?? i })))
  }
  return NextResponse.json({ ok: true })
}


