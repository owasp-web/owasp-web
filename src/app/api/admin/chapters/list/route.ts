import { NextRequest, NextResponse } from 'next/server'
import { createServerClientWithAuth } from '@/lib/supabase'

async function requireUser(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || ''
  const token = authHeader.toLowerCase().startsWith('bearer ') ? authHeader.split(' ')[1] : null
  if (!token) return { user: null, error: 'Unauthorized' }
  const supabase = createServerClientWithAuth(token)
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) return { user: null, error: 'Unauthorized' }
  return { user: data.user, error: null }
}

export async function GET(req: NextRequest) {
  const { user, error } = await requireUser(req)
  if (!user) return NextResponse.json({ error }, { status: 401 })

  const url = new URL(req.url)
  const search = url.searchParams.get('search')?.trim()
  const region = url.searchParams.get('region')?.trim()

  // Use RLS-bound client so policies restrict visibility to chapter admins or super admins
  const authHeader = req.headers.get('authorization') || ''
  const token = authHeader.toLowerCase().startsWith('bearer ') ? authHeader.split(' ')[1] : ''
  const supabase = createServerClientWithAuth(token)
  let query = supabase.from('chapters').select('*')

  if (region && region !== 'All Regions') {
    query = query.eq('region', region)
  }
  if (search) {
    query = query.or(`name.ilike.%${search}%,city.ilike.%${search}%,country.ilike.%${search}%`)
  }

  const { data, error: dbError } = await query.order('created_at', { ascending: false })
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })
  return NextResponse.json({ chapters: data || [] })
}


