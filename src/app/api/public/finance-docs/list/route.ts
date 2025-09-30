import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    const supabase = createClient(url, key)
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


