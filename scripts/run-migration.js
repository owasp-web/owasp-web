require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('🔄 Running database migration...');
  
  try {
    // Add volunteers column
    console.log('📝 Adding volunteers column to chapters table...');
    const { error: alterError } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE chapters ADD COLUMN IF NOT EXISTS volunteers JSONB DEFAULT '[]'::jsonb;
        COMMENT ON COLUMN chapters.volunteers IS 'Array of volunteer names for the chapter';
      `
    });
    
    if (alterError) {
      console.log('⚠️  Alter table error (column might already exist):', alterError.message);
    } else {
      console.log('✅ Added volunteers column');
    }
    
    // Create index for volunteers field
    console.log('📝 Creating index for volunteers field...');
    const { error: indexError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE INDEX IF NOT EXISTS idx_chapters_volunteers ON chapters USING GIN (volunteers);
      `
    });
    
    if (indexError) {
      console.log('⚠️  Index creation error (might already exist):', indexError.message);
    } else {
      console.log('✅ Created volunteers index');
    }
    
    console.log('🎉 Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    
    // Try alternative approach - check if column exists
    console.log('🔍 Checking if volunteers column already exists...');
    const { data, error: checkError } = await supabase
      .from('chapters')
      .select('volunteers')
      .limit(1);
    
    if (checkError && checkError.message.includes('column "volunteers" does not exist')) {
      console.log('❌ Volunteers column does not exist and migration failed');
      console.log('💡 You may need to run this SQL manually in your Supabase dashboard:');
      console.log('');
      console.log('ALTER TABLE chapters ADD COLUMN IF NOT EXISTS volunteers JSONB DEFAULT \'[]\'::jsonb;');
      console.log('CREATE INDEX IF NOT EXISTS idx_chapters_volunteers ON chapters USING GIN (volunteers);');
      process.exit(1);
    } else {
      console.log('✅ Volunteers column already exists or migration succeeded');
    }
  }
}

runMigration();
