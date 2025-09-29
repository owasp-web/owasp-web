import { NextRequest, NextResponse } from 'next/server'
import { createClientComponentClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const supabase = createClientComponentClient()
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    let q = supabase.from('finance_documents').select('*').order('display_order', { ascending: true }).order('year', { ascending: false }).order('created_at', { ascending: false })
    if (category) q = q.eq('category', category)
    const { data, error } = await q
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ documents: data })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


