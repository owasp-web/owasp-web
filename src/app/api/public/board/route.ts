import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    const svc = createClient(url, key)
    const { searchParams } = new URL(req.url)
    const nocache = searchParams.get('nocache')
    // Use service role to ensure visibility regardless of RLS setup
    const { data: tabsData } = await svc
      .from('board_tabs')
      .select('*')
      .order('display_order', { ascending: true })

    const { data: membersData } = await svc
      .from('board_members')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    return NextResponse.json({ tabs: tabsData || [], members: membersData || [] }, { headers: nocache ? { 'Cache-Control': 'no-store' } : undefined })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


