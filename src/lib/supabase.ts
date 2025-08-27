import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Singleton client instance to prevent multiple GoTrueClient instances
let clientInstance: ReturnType<typeof createClient> | null = null

// Client-side Supabase client (singleton)
export const createClientComponentClient = () => {
  // Return existing client if available
  if (clientInstance) {
    return clientInstance
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    console.error('Environment variables check:')
    console.error('NEXT_PUBLIC_SUPABASE_URL:', url)
    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!key)
    throw new Error(`Missing Supabase environment variables: url=${!!url}, key=${!!key}`)
  }
  
  // Create and cache the client instance
  clientInstance = createClient(url, key)
  return clientInstance
}

// Legacy export for backward compatibility
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClientComponentClient()
  : null

// Server-side Supabase client (for API routes)
export const createServerComponentClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!url || !key) {
    throw new Error('Missing Supabase environment variables')
  }
  
  return createClient(url, key)
} 