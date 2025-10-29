# Story Finder - Deployment Guide

This guide will help you deploy the Story Finder app to your own Vercel and Supabase accounts.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Supabase account (free tier available)
- Basic familiarity with web interfaces

## Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `story-finder`
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait for setup to complete (2-3 minutes)

### 1.2 Get Database Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values (you'll need them later):
   - **Project URL** (looks like: `https://your-project.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### 1.3 Set Up Database Tables
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire content from `supabase-content-schema.sql` (included in this repo)
4. Click "Run" to execute the script
5. Verify tables were created by going to **Table Editor** - you should see:
   - `rules`
   - `questions` 
   - `feedback_messages`
   - `landing_content`
   - `quiz_results`
   - `question_responses`

## Step 2: Set Up GitHub Repository

### 2.1 Fork or Clone the Repository
**Option A: Fork (Recommended)**
1. Go to the original repository on GitHub
2. Click "Fork" button
3. Choose your GitHub account as destination

**Option B: Clone and Create New Repo**
1. Clone the repository locally
2. Create a new repository on your GitHub account
3. Push the code to your new repository

### 2.2 Verify Repository Contents
Make sure your repository contains:
- All source code files
- `package.json` with dependencies
- `supabase-content-schema.sql` file
- This deployment guide

## Step 3: Deploy to Vercel

### 3.1 Connect Vercel to GitHub
1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with your GitHub account
3. Click "New Project"
4. Import your Story Finder repository
5. Vercel will auto-detect it's a Next.js project

### 3.2 Configure Environment Variables
In the Vercel deployment setup:

1. **Project Name**: `story-finder` (or your preferred name)
2. **Framework Preset**: Next.js (should be auto-detected)
3. **Root Directory**: `./` (default)
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `.next` (default)

### 3.3 Add Environment Variables
Click "Environment Variables" and add these:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJ...your-anon-key-here
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password-here
```

**Important**: Replace the placeholder values with your actual Supabase credentials and choose a secure admin password.

### 3.4 Deploy
1. Click "Deploy"
2. Wait for deployment to complete (2-5 minutes)
3. Vercel will provide you with a live URL (e.g., `https://story-finder.vercel.app`)

## Step 4: Test Your Deployment

### 4.1 Test the Main App
1. Visit your Vercel URL
2. Take the quiz to ensure it works
3. Check that results are saved

### 4.2 Test Admin Access
1. Go to `https://your-app.vercel.app/admin/login`
2. Log in with your admin credentials
3. Test the content editor at `/admin/content`
4. Test the analytics dashboard at `/admin/analytics`

### 4.3 Test Content Management
1. In the content editor, try editing a question
2. Save the changes
3. Refresh the main quiz page to see if changes appear
4. Test editing feedback messages and landing page content

## Step 5: Customize Your App

### 5.1 Update Content
Use the admin interface at `/admin/content` to:
- Edit quiz questions
- Modify feedback messages
- Update landing page content
- Change rule descriptions

### 5.2 Update Branding
- Replace logo images in `/public/` folder
- Update colors in `tailwind.config.js`
- Modify metadata in `src/app/layout.tsx`

### 5.3 Set Up Custom Domain (Optional)
1. In Vercel dashboard, go to your project
2. Click "Domains"
3. Add your custom domain
4. Follow DNS setup instructions

## Troubleshooting

### Common Issues

**"Failed to fetch rules" error**
- Check that environment variables are set correctly in Vercel
- Verify Supabase URL and keys are correct
- Ensure database tables were created successfully

**Admin login not working**
- Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set in Vercel
- Check that the admin login page loads correctly

**Quiz results not saving**
- Check Supabase database for `quiz_results` and `question_responses` tables
- Verify database permissions are set correctly

**Content changes not appearing**
- Clear browser cache
- Check that content was saved in the admin interface
- Verify database connection is working

### Getting Help

1. Check Vercel deployment logs in the dashboard
2. Check Supabase logs in the dashboard
3. Use browser developer tools to check for JavaScript errors
4. Verify all environment variables are set correctly

## Security Considerations

1. **Change default admin password** immediately after deployment
2. **Use strong passwords** for all accounts
3. **Keep Supabase credentials secure** - never commit them to code
4. **Regular backups** - Supabase provides automatic backups on paid plans
5. **Monitor usage** - check Vercel and Supabase dashboards regularly

## Next Steps

After successful deployment:

1. **Test thoroughly** - have friends/family take the quiz
2. **Customize content** - update questions and feedback to match your needs
3. **Set up monitoring** - check analytics regularly
4. **Plan for growth** - consider upgrading to paid plans if needed

## Support

If you encounter issues:
1. Check this guide first
2. Review Vercel and Supabase documentation
3. Check the original repository for updates
4. Contact the original developer if needed

---

**Congratulations!** You now have your own Story Finder app running on your infrastructure.
