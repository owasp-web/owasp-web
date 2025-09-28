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
    return NextResponse.json({ project: data }, { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' } })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


