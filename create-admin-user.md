# Create New Admin User

## Simple Test Credentials
Here are simple credentials you can use for testing:

**Email**: `admin@owasp.test`  
**Password**: `admin123`

## How to Create the Admin User

### Option 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase project dashboard**
   - Navigate to: https://supabase.com/dashboard/projects
   - Select your OWASP project

2. **Navigate to Authentication**
   - Click on "Authentication" in the left sidebar
   - Click on "Users" tab

3. **Create New User**
   - Click "Add user" or "Invite user" button
   - Enter the credentials:
     - **Email**: `admin@owasp.test`
     - **Password**: `admin123`
   - Click "Send invitation" or "Create user"

4. **Confirm User (if needed)**
   - If the user shows as "unconfirmed", click on the user
   - Click "Confirm user" to activate the account

### Option 2: Using SQL (Alternative)

If you prefer to use SQL, you can run this in your Supabase SQL Editor:

```sql
-- This will create a user in the auth.users table
-- Note: You might need to use the Supabase dashboard for user creation
-- as direct SQL insertion into auth.users requires special handling

-- Instead, use the dashboard method above, or you can create an invite
-- and then the user can sign up with the provided credentials
```

## Testing the Admin Access

1. **Navigate to your admin page**: `https://your-site.vercel.app/admin`
2. **Use the credentials**:
   - Email: `admin@owasp.test`
   - Password: `admin123`
3. **You should now have access to**:
   - Events management
   - Admin dashboard
   - All CRUD operations

## Security Notes

- These are test credentials - change them for production use
- The password `admin123` is simple for testing but should be stronger for production
- You can always create additional admin users or change passwords in Supabase dashboard

## If You Have Issues

1. **Check Supabase Environment Variables** are set in Vercel
2. **Ensure RLS policies** allow authenticated users to access admin functions
3. **Verify the user is confirmed** in Supabase Auth dashboard