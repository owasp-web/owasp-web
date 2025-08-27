# OWASP Website Admin Setup Guide

## Overview
This guide will help you set up the admin section for managing events, projects, and chapters through Supabase integration.

## Environment Variables for Vercel

Set these environment variables in your Vercel dashboard:

### Required Environment Variables:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: Your Supabase project URL (e.g., `https://your-project-id.supabase.co`)
   - Found in: Supabase Dashboard → Project Settings → API

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Value: Your Supabase anonymous/public key
   - Found in: Supabase Dashboard → Project Settings → API

3. **SUPABASE_SERVICE_ROLE_KEY**
   - Value: Your Supabase service role key (keep this secret!)
   - Found in: Supabase Dashboard → Project Settings → API
   - ⚠️ **Important**: This is a secret key with admin privileges

## Database Setup

1. **Go to your Supabase project SQL Editor**
2. **Run the SQL script** from `supabase-schema.sql` to create the tables
3. **Create an admin user** in Supabase Auth (Authentication → Users → Invite User)

## Admin Features

### Current Implementation:
- ✅ **Events Management**: Full CRUD operations for events
- ✅ **Authentication**: Secure login for admin access
- ✅ **Event Form**: Rich form with validation for all event fields
- ✅ **Event Status**: Draft, Published, Cancelled states
- ✅ **Featured Events**: Toggle for homepage highlighting

### Coming Soon:
- 🔄 **Projects Management**: Full project CRUD operations
- 🔄 **Chapters Management**: Chapter information management

## Admin Access

1. **Navigate to** `/admin` on your deployed site
2. **Sign in** with the admin credentials you created in Supabase Auth
3. **Manage events** through the Events section

## Admin Routes

- `/admin` - Main admin dashboard
- `/admin/events` - Events listing and management
- `/admin/events/new` - Create new event
- `/admin/events/[id]/edit` - Edit existing event

## Security Notes

- Row Level Security (RLS) is enabled on all tables
- Public users can only view published/active content
- Authenticated users (admins) have full CRUD access
- Service role key should never be exposed to the client side

## Event Data Structure

Events include the following fields:
- **Basic Info**: Title, Date, Month, Year, Time, Location
- **Content**: Description, Image URL
- **Metadata**: Type (Conference/Meeting/Training/Workshop), Status, Featured flag
- **Registration**: Price, Registration URL

## Local Development

If you want to test locally, create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Database Schema

The system uses three main tables:
- **events**: Event information and metadata
- **projects**: OWASP project details (coming soon)
- **chapters**: Chapter information by region (coming soon)

All tables include:
- Auto-generated UUIDs
- Created/updated timestamps
- Proper indexing for performance
- Row-level security policies

## Troubleshooting

### Common Issues:

1. **Can't access admin page**: Check environment variables are set correctly
2. **Database errors**: Ensure SQL schema has been run in Supabase
3. **Authentication fails**: Verify admin user exists in Supabase Auth
4. **RLS errors**: Make sure user is authenticated and has proper permissions

### Support

For issues with this admin system, check:
1. Supabase project settings and API keys
2. Database table structure and RLS policies
3. Vercel environment variable configuration 