import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

function getBearerToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) return null
  return authHeader.split(' ')[1]
}

export async function GET(req: NextRequest) {
  const token = getBearerToken(req)
  if (!token) return NextResponse.json({ error: 'Missing Authorization header' }, { status: 401 })

  const supabase = createServerComponentClient()
  const { data: userData, error: userErr } = await supabase.auth.getUser(token)
  if (userErr || !userData?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const email = (userData.user as any)?.email || ''

  // Determine super admin
  const { data: superRows } = await supabase
    .from('global_admins')
    .select('id')
    .or(`user_id.eq.${userData.user.id},email.eq.${email}`)
    .limit(1)
  const isSuperAdmin = !!(superRows && superRows.length > 0)

  // Figure out chapter ids for this user
  let chapterIds: string[] = []
  if (!isSuperAdmin) {
    const { data: ca } = await supabase
      .from('chapter_admins')
      .select('chapter_id')
      .or(`user_id.eq.${userData.user.id},email.eq.${email}`)
    chapterIds = (ca || []).map((r: any) => r.chapter_id)
  }

  const url = new URL(req.url)
  const chapterIdParam = url.searchParams.get('chapterId') || undefined

  // Build events query using service role
  // Return both draft and published for chapter admins (and super admins)
  let query = supabase.from('events').select('*').order('created_at', { ascending: false })
  if (isSuperAdmin) {
    if (chapterIdParam) query = query.eq('chapter_id', chapterIdParam)
  } else {
    if (chapterIdParam) {
      // Enforce the requested chapter is one of the caller's
      if (!chapterIds.includes(chapterIdParam)) {
        return NextResponse.json({ events: [] })
      }
      query = query.eq('chapter_id', chapterIdParam)
    } else {
      query = query.in('chapter_id', chapterIds.length ? chapterIds : ['00000000-0000-0000-0000-000000000000'])
    }
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ events: data || [] })
}


