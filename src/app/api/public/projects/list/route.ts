import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = (searchParams.get('search') || '').trim()
    const projectType = (searchParams.get('project_type') || '').trim()
    const category = (searchParams.get('category') || '').trim()
    const limit = Math.min(parseInt(searchParams.get('limit') || '24', 10), 100)
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0)

    const svc = createServerComponentClient()
    let query = svc
      .from('projects')
      .select('*', { count: 'exact' })
      .eq('status', 'active')

    if (projectType) {
      query = query.eq('project_type', projectType)
    }
    if (category) {
      query = query.eq('category', category)
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    query = query
      .order('is_featured', { ascending: false })
      .order('title', { ascending: true })
      .range(offset, offset + limit - 1)

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({ projects: data || [], total: count || 0 }, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' }
    })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


