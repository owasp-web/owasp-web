import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

export async function GET(req: NextRequest, context: { params: { chapterId: string } }) {
  const supabase = createServerComponentClient()
  const { chapterId } = context.params

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('chapter_id', chapterId)
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ events: data || [] })
}


