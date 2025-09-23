import { createClient } from '@supabase/supabase-js'

function parseArg(name: string): string | undefined {
  const prefix = `--${name}=`
  const arg = process.argv.find(a => a.startsWith(prefix))
  return arg ? arg.slice(prefix.length) : undefined
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRole) {
    console.error('Missing env: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  const email = parseArg('email')
  const userId = parseArg('user_id')
  if (!email && !userId) {
    console.error('Provide --email=user@example.com or --user_id=<uuid>')
    process.exit(1)
  }

  const supabase = createClient(url, serviceRole)

  // Upsert into global_admins
  const { data, error } = await supabase
    .from('global_admins')
    .upsert({ email: email || null, user_id: userId || null }, { onConflict: 'email' })
    .select('*')
    .single()

  if (error) {
    console.error('Failed to grant super admin:', error.message)
    process.exit(1)
  }

  console.log('Super admin granted:')
  console.log(data)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})


