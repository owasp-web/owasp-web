import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

export async function GET(_req: NextRequest) {
  try {
    const svc = createServerComponentClient()
    const { data, error } = await svc
      .from('projects')
      .select('*')
      .eq('status', 'active')
      .order('is_featured', { ascending: false })
      .order('title', { ascending: true })
      .limit(12)
    if (error) throw error
    return NextResponse.json({ projects: data || [] }, { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' } })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed to load projects' }, { status: 500 })
  }
}


