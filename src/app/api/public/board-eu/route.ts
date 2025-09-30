import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    const svc = createClient(url, key)
    const { data: tabsData, error: tabsErr } = await svc
      .from('board_eu_tabs')
      .select('*')
      .order('display_order', { ascending: true })
    if (tabsErr) return NextResponse.json({ error: tabsErr.message }, { status: 400 })

    const { data: membersData, error: membersErr } = await svc
      .from('board_eu_members')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })
    if (membersErr) return NextResponse.json({ error: membersErr.message }, { status: 400 })

    return NextResponse.json({ tabs: tabsData || [], members: membersData || [] })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


