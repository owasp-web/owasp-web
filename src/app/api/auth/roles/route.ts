import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

async function requireAuthenticatedUser(req: NextRequest) {
  const supabase = createServerComponentClient()
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
    return { user: null, error: 'Missing Authorization header' }
  }
  const token = authHeader.split(' ')[1]
  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data?.user) {
    return { user: null, error: 'Invalid or expired token' }
  }
  return { user: data.user, error: null }
}

export async function GET(req: NextRequest) {
  const { user, error } = await requireAuthenticatedUser(req)
  if (!user) return NextResponse.json({ error }, { status: 401 })

  const supabase = createServerComponentClient()

  // Check super admin
  const { data: superRows } = await supabase
    .from('global_admins')
    .select('id')
    .or(`user_id.eq.${user.id},email.eq.${(user as any).email}`)
    .limit(1)

  const isSuperAdmin = !!(superRows && superRows.length > 0)

  // List chapter ids the user administers
  const { data: chapterRows } = await supabase
    .from('chapter_admins')
    .select('chapter_id')
    .or(`user_id.eq.${user.id},email.eq.${(user as any).email}`)

  const chapterIds = (chapterRows || []).map((r: any) => r.chapter_id)

  return NextResponse.json({ isSuperAdmin, chapterIds })
}


