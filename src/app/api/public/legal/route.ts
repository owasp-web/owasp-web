import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    const svc = createClient(url, key)
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    if (slug) {
      const { data, error } = await svc
        .from('legal_pages')
        .select('*')
        .eq('slug', slug)
        .limit(1)
        .maybeSingle()
      if (error) return NextResponse.json({ error: error.message }, { status: 400 })
      return NextResponse.json({ page: data || null })
    }
    const { data, error } = await svc
      .from('legal_pages')
      .select('id,title,slug,display_order')
      .order('display_order', { ascending: true })
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ pages: data || [] })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}


