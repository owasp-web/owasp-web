import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

function getBearerToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) return null
  return authHeader.split(' ')[1]
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
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
  const { error } = await svc.from('chapters').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const token = getBearerToken(req)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const svc = createServerComponentClient()
  const { data: userData, error: userErr } = await svc.auth.getUser(token)
  if (userErr || !userData?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const email = (userData.user as any)?.email || ''

  // Check super admin
  const { data: superRows } = await svc
    .from('global_admins')
    .select('id')
    .or(`user_id.eq.${userData.user.id},email.eq.${email}`)
    .limit(1)
  const isSuperAdmin = !!(superRows && superRows.length > 0)

  const { id } = context.params
  let allowed = isSuperAdmin
  if (!allowed) {
    const { data: ca } = await svc
      .from('chapter_admins')
      .select('id')
      .eq('chapter_id', id)
      .or(`user_id.eq.${userData.user.id},email.eq.${email}`)
      .limit(1)
    allowed = !!(ca && ca.length > 0)
  }
  if (!allowed) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json().catch(() => ({}))
  delete body.id
  delete body.created_at

  const { data, error } = await svc
    .from('chapters')
    .update(body)
    .eq('id', id)
    .select('*')
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ chapter: data })
}


