/*
  Supabase Storage migration: copy all objects from OLD project to NEW project.
  Usage:
    export OLD_SUPABASE_URL=... OLD_SERVICE_ROLE_KEY=...
    export NEW_SUPABASE_URL=... NEW_SERVICE_ROLE_KEY=...
    ts-node scripts/migrate-supabase-storage.ts
  Or compile with ts-node/register via npx if needed.
*/

import { createClient, SupabaseClient } from '@supabase/supabase-js'

const OLD_SUPABASE_URL = process.env.OLD_SUPABASE_URL
const OLD_SERVICE_ROLE_KEY = process.env.OLD_SERVICE_ROLE_KEY
const NEW_SUPABASE_URL = process.env.NEW_SUPABASE_URL
const NEW_SERVICE_ROLE_KEY = process.env.NEW_SERVICE_ROLE_KEY

if (!OLD_SUPABASE_URL || !OLD_SERVICE_ROLE_KEY || !NEW_SUPABASE_URL || !NEW_SERVICE_ROLE_KEY) {
  throw new Error('Please set OLD_SUPABASE_URL, OLD_SERVICE_ROLE_KEY, NEW_SUPABASE_URL, NEW_SERVICE_ROLE_KEY')
}

const oldClient = createClient(OLD_SUPABASE_URL, OLD_SERVICE_ROLE_KEY)
const newClient = createClient(NEW_SUPABASE_URL, NEW_SERVICE_ROLE_KEY)

async function listAllBuckets(client: SupabaseClient) {
  const { data, error } = await client.storage.listBuckets()
  if (error) throw error
  return data
}

async function ensureBucketExists(client: SupabaseClient, bucketId: string, isPublic: boolean) {
  const { data: buckets } = await client.storage.listBuckets()
  const exists = buckets?.some(b => b.id === bucketId)
  if (!exists) {
    const { error } = await client.storage.createBucket(bucketId, { public: isPublic })
    if (error) throw error
  }
}

async function migrateBucket(bucketId: string, isPublic: boolean) {
  console.log(`Migrating bucket: ${bucketId} (public=${isPublic})`)
  await ensureBucketExists(newClient, bucketId, isPublic)

  // Walk objects recursively
  async function walk(prefix = ''): Promise<void> {
    const { data: items, error } = await oldClient.storage.from(bucketId).list(prefix, { limit: 1000 })
    if (error) throw error
    for (const item of items ?? []) {
      if (item.name.endsWith('/')) continue
      if ((item as any).id === undefined && (item as any).type === 'folder') {
        await walk(`${prefix ? prefix + '/' : ''}${item.name}`)
        continue
      }

      const objectPath = `${prefix ? prefix + '/' : ''}${item.name}`
      const { data: blob, error: dlErr } = await oldClient.storage.from(bucketId).download(objectPath)
      if (dlErr) {
        console.error('Download failed:', bucketId, objectPath, dlErr.message)
        continue
      }
      const { error: upErr } = await newClient.storage.from(bucketId).upload(objectPath, blob, { upsert: true })
      if (upErr) {
        console.error('Upload failed:', bucketId, objectPath, upErr.message)
      } else {
        console.log('Uploaded:', objectPath)
      }
    }
  }

  await walk('')
}

async function main() {
  const buckets = await listAllBuckets(oldClient)
  for (const bucket of buckets) {
    await migrateBucket(bucket.id, bucket.public)
  }
  console.log('Storage migration completed.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})


