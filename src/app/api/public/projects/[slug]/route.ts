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

    // If image is missing but we have screenshots, promote first screenshot as image for public consumption
    if ((data as any) && !(data as any).image && Array.isArray((data as any).screenshots) && (data as any).screenshots.length > 0) {
      const first = (data as any).screenshots[0]
      if (first?.url) {
        (data as any).image = first.url
      }
    }
    return NextResponse.json({ project: data }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


