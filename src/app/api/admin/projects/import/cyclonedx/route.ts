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

  // If exists, return it
  const slug = 'cyclonedx'
  const { data: existing } = await svc.from('projects').select('*').eq('slug', slug).maybeSingle()
  if (existing) return NextResponse.json({ project: existing, created: false })

  const description = 'OWASP CycloneDX is a full-stack Bill of Materials (BOM) standard (ECMA-424) that enables advanced supply chain capabilities for cyber risk reduction.'
  const project_overview = [
    'CycloneDX supports SBOM, SaaSBOM, HBOM, ML-BOM, CBOM, MBOM and OBOM, as well as VDR, VEX and CDXA. The specification is available in JSON, XML and Protocol Buffers and is supported by a wide ecosystem of tools.',
    'Strategic direction is managed by the CycloneDX Core Working Group, backed by the OWASP Foundation and supported by the global security community.',
  ].join('\n\n')

  const payload: Record<string, any> = {
    title: 'CycloneDX',
    slug,
    description,
    project_overview,
    category: 'Standard',
    project_type: 'flagship',
    status: 'active',
    is_featured: true,
    website_url: 'https://owasp.org/www-project-cyclonedx/',
    documentation_url: 'https://owasp.org/www-project-cyclonedx/',
    github_url: 'https://github.com/CycloneDX',
    language: 'Specification',
    license: 'Apache-2.0',
    content_status: 'published'
  }

  const { data, error } = await svc.from('projects').insert(payload).select('*').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ project: data, created: true })
}


