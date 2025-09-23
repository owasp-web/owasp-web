import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

function requireEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRole) throw new Error('Missing Supabase env vars')
  return { url, serviceRole }
}

async function requireUser(req: NextApiRequest) {
  const authHeader = (req.headers.authorization || req.headers.Authorization) as string | undefined
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) return null
  const token = authHeader.split(' ')[1]
  const { url, serviceRole } = requireEnv()
  const supabase = createClient(url, serviceRole)
  const { data } = await supabase.auth.getUser(token)
  return data?.user || null
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const user = await requireUser(req)
  if (!user) return res.status(401).json({ error: 'Unauthorized' })

  const { url, serviceRole } = requireEnv()
  const supabase = createClient(url, serviceRole)

  const search = (req.query.search as string | undefined)?.trim()
  const region = (req.query.region as string | undefined)?.trim()

  let query = supabase.from('chapters').select('*')
  if (region && region !== 'All Regions') query = query.eq('region', region)
  if (search) query = query.or(`name.ilike.%${search}%,city.ilike.%${search}%,country.ilike.%${search}%`)

  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ chapters: data || [] })
}


