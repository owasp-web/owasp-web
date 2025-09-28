import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getBearerToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) return null
  return authHeader.split(' ')[1]
}

export async function POST(req: NextRequest) {
  try {
    const token = getBearerToken(req)
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const form = await req.formData()
    const file = form.get('file') as File | null
    const folder = (form.get('folder') as string | null) || 'uploads'
    if (!file) return NextResponse.json({ error: 'file is required' }, { status: 400 })

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return NextResponse.json({ error: 'Server not configured for upload' }, { status: 500 })

    const svc = createClient(url, key)

    // Validate caller is super admin
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

    const buffer = Buffer.from(await file.arrayBuffer())
    const ext = (file.name.split('.').pop() || 'bin').toLowerCase()
    const objectPath = `${folder.replace(/^\/+|\/+$/g, '')}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error: uploadErr } = await svc.storage.from('project-media').upload(objectPath, buffer, {
      contentType: file.type || 'application/octet-stream',
      upsert: false
    })
    if (uploadErr) return NextResponse.json({ error: uploadErr.message }, { status: 500 })

    const { data: signed } = await svc.storage.from('project-media').createSignedUrl(objectPath, 60 * 60 * 24 * 365) // 1-year signed URL
    const publicUrl = `${url}/storage/v1/object/public/project-media/${objectPath}`

    return NextResponse.json({ path: objectPath, url: signed?.signedUrl || publicUrl })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


