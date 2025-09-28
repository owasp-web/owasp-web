import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '30', 10), 100)
    const search = (searchParams.get('search') || '').trim()

    const svc = createServerComponentClient()
    let query = svc
      .from('chapters')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true })
      .limit(limit)

    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ chapters: data || [] }, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' }
    })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


