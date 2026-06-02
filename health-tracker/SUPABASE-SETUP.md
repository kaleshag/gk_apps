# Supabase Setup Guide

Complete guide to set up cloud sync for your Health & Habits Tracker.

## Step 1: Configure Your Supabase Key

1. Open [`config.js`](config.js)
2. Replace `YOUR_SUPABASE_ANON_KEY_HERE` with your actual anon/public key
3. The URL is already set: `https://ovcokjysbkdmyjiqiffq.supabase.co`

```javascript
const SUPABASE_CONFIG = {
    url: 'https://ovcokjysbkdmyjiqiffq.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // Your actual key here
};
```

## Step 2: Create Database Table

1. Go to your Supabase dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste this SQL:

```sql
-- Create health_data table
CREATE TABLE health_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    date TEXT NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- Enable Row Level Security
ALTER TABLE health_data ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can only see their own data
CREATE POLICY "Users can view own data"
    ON health_data
    FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own data
CREATE POLICY "Users can insert own data"
    ON health_data
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own data
CREATE POLICY "Users can update own data"
    ON health_data
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Users can delete their own data
CREATE POLICY "Users can delete own data"
    ON health_data
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_health_data_user_date ON health_data(user_id, date);
CREATE INDEX idx_health_data_updated ON health_data(updated_at DESC);
```

5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

## Step 3: Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email templates (optional):
   - Go to **Authentication** → **Email Templates**
   - Customize confirmation email if desired

## Step 4: Test the Setup

1. Push your code to GitHub:
```bash
cd /Users/gkalesha/GK/gk_apps
git add .
git commit -m "Add Supabase cloud sync"
git push origin main
```

2. Wait 1-2 minutes for GitHub Pages to deploy

3. Visit your app: `https://kaleshag.github.io/gk_apps/health-tracker/`

4. Click **"Sign In"** button

5. Click **"Sign Up"** and create an account with your email

6. Check your email for confirmation link

7. After confirming, sign in with your credentials

8. Add some data (food, workout, etc.)

9. Open the app in a different browser or device

10. Sign in with the same credentials

11. Your data should sync! 🎉

## How It Works

### Data Flow

```
┌─────────────┐
│   Browser   │
│  (Safari)   │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌──────────────┐
│ localStorage│────▶│   Supabase   │
│   (Local)   │◀────│   (Cloud)    │
└─────────────┘     └──────┬───────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Browser   │
                    │  (Chrome)   │
                    └─────────────┘
```

### Features

✅ **Real-time Sync** - Data syncs automatically when you make changes
✅ **Offline First** - Works without internet, syncs when online
✅ **Cross-Device** - Access from any device with same login
✅ **Secure** - Row Level Security ensures you only see your data
✅ **Automatic Backup** - All data stored in cloud database

### Security

- **Row Level Security (RLS)** enabled
- Each user can only access their own data
- Passwords hashed with bcrypt
- HTTPS encryption for all data transfer
- Anon key is safe to use in client-side code

## Troubleshooting

### "Supabase not configured" message
- Check that you replaced the anon key in `config.js`
- Make sure the key is the full key (200+ characters)
- Hard refresh the page (Ctrl+Shift+R)

### Can't sign up
- Check email is valid format
- Password must be at least 6 characters
- Check Supabase dashboard for error logs

### Data not syncing
- Make sure you're signed in (check top of page)
- Check browser console (F12) for errors
- Verify database table was created correctly
- Check RLS policies are enabled

### "relation health_data does not exist"
- You need to run the SQL from Step 2
- Go to SQL Editor and run the CREATE TABLE command

## Free Tier Limits

Supabase free tier includes:
- ✅ 500MB database storage
- ✅ 2GB bandwidth per month
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests

**This is more than enough for personal use!**

## Data Privacy

- Your data is stored in Supabase's secure cloud
- Only you can access your data (enforced by RLS)
- Supabase is SOC 2 Type 2 certified
- Data encrypted in transit and at rest
- You can export/delete your data anytime

## Support

If you encounter issues:
1. Check browser console (F12) for errors
2. Check Supabase dashboard logs
3. Verify all setup steps completed
4. Try signing out and back in

---

**Health & Habits Tracker v1.1.0 with Cloud Sync**  
**© 2026 GK (Kalesha Gagguturu). All rights reserved.**