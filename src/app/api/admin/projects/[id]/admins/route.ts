import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@/lib/supabase'

function getBearerToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) return null
  return authHeader.split(' ')[1]
}

async function requireSuper(req: NextRequest) {
  const token = getBearerToken(req)
  if (!token) return { error: 'Unauthorized' }
  const svc = createServerComponentClient()
  const { data: userData, error: userErr } = await svc.auth.getUser(token)
  if (userErr || !userData?.user) return { error: 'Unauthorized' }
  const email = (userData.user as any)?.email || ''
  const { data: superRows } = await svc
    .from('global_admins')
    .select('id')
    .or(`user_id.eq.${userData.user.id},email.eq.${email}`)
    .limit(1)
  const isSuperAdmin = !!(superRows && superRows.length > 0)
  if (!isSuperAdmin) return { error: 'Forbidden' }
  return { svc }
}

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const check = await requireSuper(req)
  if ('error' in check) return NextResponse.json(check, { status: check.error === 'Forbidden' ? 403 : 401 })
  const { svc } = check
  const { id } = context.params
  const { data, error } = await svc.from('project_admins').select('*').eq('project_id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ admins: data || [] })
}

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  const check = await requireSuper(req)
  if ('error' in check) return NextResponse.json(check, { status: check.error === 'Forbidden' ? 403 : 401 })
  const { svc } = check
  const { id } = context.params
  const body = await req.json().catch(() => ({}))
  const email = (body?.email || '').toString().trim().toLowerCase()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
  
  // Generate a strong temporary password
  const generatePassword = (): string => {
    const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@$%^&*'
    let pwd = 'OwaspAdmin!'
    for (let i = 0; i < 12; i++) {
      pwd += charset[Math.floor(Math.random() * charset.length)]
    }
    return pwd
  }
  const tempPassword = generatePassword()

  // Create or update the Supabase auth user with this email
  let userId: string | null = null
  try {
    const adminApi: any = (svc as any).auth.admin
    // Try to find existing user (no direct get-by-email; list and filter)
    const { data: list } = await adminApi.listUsers()
    const existing = list?.users?.find((u: any) => (u?.email || '').toLowerCase() === email)
    if (existing?.id) {
      userId = existing.id
      // Set/reset a temporary password for login
      const { error: updErr } = await adminApi.updateUserById(userId, {
        password: tempPassword,
        email_confirm: true
      })
      if (updErr) throw updErr
    } else {
      const { data: created, error: createErr } = await adminApi.createUser({
        email,
        password: tempPassword,
        email_confirm: true
      })
      if (createErr) throw createErr
      userId = created?.user?.id || null
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed to create or update user' }, { status: 500 })
  }

  // Insert or update project_admins row
  let adminRow: any = null
  const insertRes = await svc
    .from('project_admins')
    .insert({ project_id: id, email, user_id: userId })
    .select('*')
    .single()

  if ((insertRes as any).error) {
    const err = (insertRes as any).error
    // On conflict (already exists), update the user_id and return the row
    if ((err as any).code === '23505' || /duplicate key value/i.test((err as any).message || '')) {
      const { data: updRow, error: updErr } = await svc
        .from('project_admins')
        .update({ user_id: userId })
        .eq('project_id', id)
        .eq('email', email)
        .select('*')
        .single()
      if (updErr) return NextResponse.json({ error: updErr.message }, { status: 400 })
      adminRow = updRow
    } else {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }
  } else {
    adminRow = (insertRes as any).data
  }

  return NextResponse.json({ admin: adminRow, tempPassword })
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const check = await requireSuper(req)
  if ('error' in check) return NextResponse.json(check, { status: check.error === 'Forbidden' ? 403 : 401 })
  const { svc } = check
  const { id } = context.params
  const body = await req.json().catch(() => ({}))
  const email = (body?.email || '').toString().trim().toLowerCase()
  const adminId = (body?.id || '').toString().trim()
  let q = svc.from('project_admins').delete().eq('project_id', id)
  if (adminId) q = q.eq('id', adminId)
  if (email) q = q.eq('email', email)
  const { error } = await q
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}


