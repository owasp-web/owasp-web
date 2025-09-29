import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getBearerToken(req: NextRequest) {
  const h = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!h || !h.toLowerCase().startsWith('bearer ')) return null
  return h.split(' ')[1]
}

export async function POST(req: NextRequest) {
  try {
    const authToken = getBearerToken(req)
    if (!authToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { folder, filename } = await req.json()
    if (!folder || !filename) return NextResponse.json({ error: 'folder and filename are required' }, { status: 400 })

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return NextResponse.json({ error: 'Server not configured' }, { status: 500 })

    const svc = createClient(url, key)
    const { data: userData, error: userErr } = await svc.auth.getUser(authToken)
    if (userErr || !userData?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const email = (userData.user as any)?.email || ''
    const { data: rows } = await svc
      .from('global_admins')
      .select('id')
      .or(`user_id.eq.${userData.user.id},email.eq.${email}`)
      .limit(1)
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const ext = (String(filename).split('.').pop() || 'bin').toLowerCase()
    const objectPath = `${String(folder).replace(/^\/+|\/+$/g, '')}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { data, error } = await svc.storage.from('project-media').createSignedUploadUrl(objectPath)
    if (error || !data) return NextResponse.json({ error: error?.message || 'Failed to create signed upload' }, { status: 500 })

    const uploadToken = (data as any).token
    const signedUrl = (data as any).signedUrl

    return NextResponse.json({ path: objectPath, token: uploadToken, signedUrl })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


