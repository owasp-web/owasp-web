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

    const body = await req.json()
    const { folder, filename, action, path } = body || {}

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

    const isSuperAdmin = !!(rows && rows.length > 0)

    // Helper: determine if user is project admin for project contained in given storage path
    const isAllowedForTarget = async (target: string | null | undefined) => {
      if (isSuperAdmin) return true
      const s = String(target || '')
      // Expecting patterns like: projects/{projectId}/...
      const pm = s.match(/(^|\/)projects\/(\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b)\//i)
      if (pm) {
        const projectId = pm[2]
        const { data: paRows } = await svc
          .from('project_admins')
          .select('id')
          .eq('project_id', projectId)
          .or(`user_id.eq.${userData.user.id},email.eq.${email}`)
          .limit(1)
        return !!(paRows && paRows.length > 0)
      }
      // Or chapters/{chapterId}/...
      const cm = s.match(/(^|\/)chapters\/(\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b)\//i)
      if (cm) {
        const chapterId = cm[2]
        const { data: caRows } = await svc
          .from('chapter_admins')
          .select('id')
          .eq('chapter_id', chapterId)
          .or(`user_id.eq.${userData.user.id},email.eq.${email}`)
          .limit(1)
        return !!(caRows && caRows.length > 0)
      }
      return false
    }

    // Branch: sign read URL after upload
    if (action === 'sign-read' && typeof path === 'string') {
      const allowed = await isAllowedForTarget(path)
      if (!allowed) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      const { data: signed, error: signErr } = await svc.storage.from('project-media').createSignedUrl(String(path), 60 * 60 * 24 * 365)
      if (signErr) return NextResponse.json({ error: signErr.message }, { status: 500 })
      return NextResponse.json({ url: signed?.signedUrl })
    }

    // Branch: create signed upload URL
    if (!folder || !filename) return NextResponse.json({ error: 'folder and filename are required' }, { status: 400 })
    const allowed = await isAllowedForTarget(folder)
    if (!allowed) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
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


