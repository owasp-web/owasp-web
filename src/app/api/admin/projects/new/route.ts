import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

function getBearerToken(req: NextRequest) {
  const h = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!h || !h.toLowerCase().startsWith('bearer ')) return null
  return h.split(' ')[1]
}

export async function POST(req: NextRequest) {
  const token = getBearerToken(req)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const svc = createServerComponentClient()
  const { data: userData, error: userErr } = await svc.auth.getUser(token)
  if (userErr || !userData?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const email = (userData.user as any)?.email || ''
  const { data: superRows } = await svc.from('global_admins').select('id').or(`user_id.eq.${(userData.user as any).id},email.eq.${email}`).limit(1)
  const isSuperAdmin = !!(superRows && superRows.length > 0)
  if (!isSuperAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json().catch(() => ({}))

  // Sanitize to allowed columns
  const allowed = new Set([
    'title','slug','description','long_description','image','category','status','project_url','github_url','website_url','documentation_url','is_featured','project_type','github_stars','version','downloads','contributors','features','requirements','getting_started','tags','license','language','difficulty_level','meta_title','meta_description','meta_keywords','content_status','project_overview','tab_overview_content','tab_documentation_content','tab_downloads_content','tab_community_content','tab_contribute_content','tab_support_content','screenshots','videos','tutorials','case_studies','integrations','download_count','active_installations','security_advisories','release_notes','canonical_url','related_projects','dependencies','dependents','industry_usage','compliance_standards','threat_categories','tabs','overview_cards','project_links','social_links'
  ])
  const sanitized: Record<string, any> = {}
  for (const [k, v] of Object.entries(body || {})) {
    if (allowed.has(k) && v !== undefined) sanitized[k] = v
  }

  // Defaults
  if (!sanitized.status) sanitized.status = 'active'
  if (!sanitized.content_status) sanitized.content_status = 'draft'

  const { data, error } = await svc.from('projects').insert(sanitized).select('*').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ project: data })
}


