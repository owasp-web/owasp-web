import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

export async function GET(_req: NextRequest, context: { params: { slug: string } }) {
  try {
    const { slug } = context.params
    const svc = createServerComponentClient()
    const { data, error } = await svc
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'active')
      .single()
    if (error) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Normalize possible image columns from legacy data
    const legacyImage = (data as any)?.hero_image || (data as any)?.image_url
    if (!(data as any).image && typeof legacyImage === 'string') {
      (data as any).image = legacyImage
    }

    // Stop promoting screenshots; hero should be controlled explicitly by admins
    return NextResponse.json({ project: data }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


