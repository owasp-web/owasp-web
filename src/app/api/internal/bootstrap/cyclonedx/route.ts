import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

export async function POST(_req: NextRequest) {
  try {
    const svc = createServerComponentClient()
    const slug = 'cyclonedx'
    const { data: existing } = await svc.from('projects').select('*').eq('slug', slug).maybeSingle()
    if (existing) return NextResponse.json({ project: existing, created: false })

    // Seed with concise content sourced from the public project page
    const description = 'OWASP CycloneDX is a full-stack Bill of Materials (BOM) standard (ECMA-424) for cyber risk reduction with broad ecosystem support.'
    const project_overview = [
      'CycloneDX supports SBOM, SaaSBOM, HBOM, ML-BOM, CBOM, MBOM and OBOM. It also defines VDR, VEX and CDXA. Specs are available in JSON, XML and Protocol Buffers with extensive community tooling.',
      'The specification is advanced by the CycloneDX Core Working Group, backed by the OWASP Foundation and the global security community.'
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
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Bootstrap failed' }, { status: 500 })
  }
}


