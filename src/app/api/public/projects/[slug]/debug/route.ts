import { NextResponse, NextRequest } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

export async function GET(req: NextRequest, context: { params: { slug: string } }) {
  try {
    const svc = createServerComponentClient()
    const { data, error } = await svc
      .from('projects')
      .select('id, slug, image, hero_gif_url, hero_video_url, tags, related_projects')
      .eq('slug', context.params.slug)
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ project: data })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'unknown' }, { status: 500 })
  }
}
