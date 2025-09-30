import { NextRequest, NextResponse } from 'next/server'
import { createClientComponentClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const supabase = createClientComponentClient()
    const { data: tabsData, error: tabsErr } = await supabase
      .from('board_eu_tabs')
      .select('*')
      .order('display_order', { ascending: true })
    if (tabsErr) return NextResponse.json({ error: tabsErr.message }, { status: 400 })

    const { data: membersData, error: membersErr } = await supabase
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


