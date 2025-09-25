import { NextRequest, NextResponse } from 'next/server'
import { createServerClientWithAuth, createServerComponentClient } from '@/lib/supabase'

function getBearerToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) return null
  return authHeader.split(' ')[1]
}

export async function POST(req: NextRequest, context: { params: { chapterId: string } }) {
  const token = getBearerToken(req)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const svc = createServerComponentClient()
  const { data: userData, error: userErr } = await svc.auth.getUser(token)
  if (userErr || !userData?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { chapterId } = context.params
  const body = await req.json().catch(() => ({}))
  body.chapter_id = chapterId

  // Authorization: super admin or chapter admin for this chapter
  const email = (userData.user as any)?.email || ''
  const { data: superRows } = await svc
    .from('global_admins')
    .select('id')
    .or(`user_id.eq.${userData.user.id},email.eq.${email}`)
    .limit(1)

  let isAllowed = !!(superRows && superRows.length > 0)
  if (!isAllowed) {
    const { data: caRows } = await svc
      .from('chapter_admins')
      .select('id')
      .eq('chapter_id', chapterId)
      .or(`user_id.eq.${userData.user.id},email.eq.${email}`)
      .limit(1)
    isAllowed = !!(caRows && caRows.length > 0)
  }

  if (!isAllowed) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Insert using service role (explicitly authorized above)
  const { data, error } = await svc
    .from('events')
    .insert(body)
    .select('*')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ event: data })
}


