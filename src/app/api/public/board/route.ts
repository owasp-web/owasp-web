import { NextRequest, NextResponse } from 'next/server'
import { createClientComponentClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const supabase = createClientComponentClient()
    const { searchParams } = new URL(req.url)
    const nocache = searchParams.get('nocache')
    // Avoid stale cache in some hosts
    const { data: tabsData } = await supabase
      .from('board_tabs')
      .select('*')
      .order('display_order', { ascending: true })

    const { data: membersData } = await supabase
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


