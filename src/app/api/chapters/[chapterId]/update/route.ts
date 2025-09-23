import { NextRequest, NextResponse } from 'next/server'
import { createServerClientWithAuth } from '@/lib/supabase'

function getBearerToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) return null
  return authHeader.split(' ')[1]
}

export async function PUT(req: NextRequest, context: { params: { chapterId: string } }) {
  const token = getBearerToken(req)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServerClientWithAuth(token)
  const { chapterId } = context.params
  const body = await req.json().catch(() => ({}))

  // Prevent id/created_at overwrite
  delete body.id
  delete body.created_at

  const { data, error } = await supabase
    .from('chapters')
    .update(body)
    .eq('id', chapterId)
    .select('*')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ chapter: data })
}


