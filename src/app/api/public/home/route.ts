import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

export async function GET(_req: NextRequest) {
  try {
    const svc = createServerComponentClient()
    const { data: settings } = await svc.from('home_settings').select('*').eq('id', 'global').single()
    const { data: slides } = await svc.from('home_slides').select('*').eq('status', 'active').order('order_num', { ascending: true })
    return NextResponse.json({ settings: settings || null, slides: slides || [] }, { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' } })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


