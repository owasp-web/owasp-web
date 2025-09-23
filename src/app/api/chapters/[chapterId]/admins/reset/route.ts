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

export async function POST(req: NextRequest, context: { params: { chapterId: string } }) {
  const { user, error } = await requireAuthenticatedUser(req)
  if (!user) {
    return NextResponse.json({ error }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const email = (body?.email || '').toString().trim().toLowerCase()
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const supabase = createServerComponentClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || ''
  const redirectTo = siteUrl ? `${siteUrl}/auth/callback` : undefined

  const { data, error: linkError } = await supabase.auth.admin.generateLink({
    type: 'recovery',
    email,
    options: { redirectTo }
  } as any)

  if (linkError) {
    return NextResponse.json({ error: linkError.message }, { status: 500 })
  }

  // Prefer the action_link; fallback to data properties that may be present
  const resetUrl = (data as any)?.properties?.action_link || (data as any)?.action_link || null
  return NextResponse.json({ resetUrl })
}


