import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

function getBearerToken(req: NextRequest) {
  const h = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!h || !h.toLowerCase().startsWith('bearer ')) return null
  return h.split(' ')[1]
}

export async function GET(req: NextRequest) {
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

  const { data, error } = await svc
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ resources: data || [] })
}


