import { createClient } from '@supabase/supabase-js'

function parseArg(name: string, fallback?: string): string | undefined {
  const prefix = `--${name}=`
  const arg = process.argv.find(a => a.startsWith(prefix))
  if (arg) return arg.slice(prefix.length)
  return fallback
}

function generatePassword(): string {
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@$%^&*'
  let pwd = 'OwaspAdmin!'
  for (let i = 0; i < 12; i++) {
    pwd += charset[Math.floor(Math.random() * charset.length)]
  }
  return pwd
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRole) {
    console.error('Missing environment variables: NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY')
    console.error('Set them before running, e.g.:')
    console.error('NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run create:admin -- --email=... --password=...')
    process.exit(1)
  }

  const defaultEmail = `admin+${new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14)}@owasp.test`
  const email = parseArg('email', defaultEmail)!
  const password = parseArg('password', generatePassword())!

  console.log('Creating admin user...')
  console.log(`Email: ${email}`)

  const supabase = createClient(url, serviceRole)

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })

  if (error) {
    console.error('Failed to create user:', error.message)
    process.exit(1)
  }

  console.log('User created successfully:')
  console.log(`User ID: ${data.user?.id}`)
  console.log(`Login Email: ${email}`)
  console.log(`Login Password: ${password}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})


