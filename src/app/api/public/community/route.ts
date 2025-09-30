import { NextRequest, NextResponse } from 'next/server'
import { createClientComponentClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const supabase = createClientComponentClient()
    const { data, error } = await supabase
      .from('community_tabs')
      .select('*')
      .order('display_order', { ascending: true })
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ tabs: data || [] })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


