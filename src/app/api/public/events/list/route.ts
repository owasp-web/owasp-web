import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '8', 10), 100)
    const svc = createServerComponentClient()
    const { data, error } = await svc
      .from('events')
      .select('*')
      .eq('status', 'published')
      .order('date', { ascending: true })
      .limit(limit)
    if (error) throw error
    return NextResponse.json({ events: data || [] }, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' }
    })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


