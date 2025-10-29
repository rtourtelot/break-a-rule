# Story Finder - Quick Start Guide

**Get your Story Finder app running in 15 minutes!**

## 🚀 Super Quick Setup (TL;DR)

1. **Create accounts**: [Supabase](https://supabase.com) + [Vercel](https://vercel.com) + [GitHub](https://github.com)
2. **Fork this repo** to your GitHub account
3. **Set up Supabase**: Create project → Run SQL script → Get credentials
4. **Deploy to Vercel**: Import repo → Add environment variables → Deploy
5. **Test**: Take the quiz and check admin panel

## 📋 Detailed Steps

### Step 1: Supabase (5 minutes)
```bash
1. Go to supabase.com → Create account → New Project
2. Copy your Project URL and anon key from Settings → API
3. Go to SQL Editor → New Query → Paste supabase-content-schema.sql → Run
4. Verify tables created in Table Editor
```

### Step 2: GitHub (2 minutes)
```bash
1. Fork this repository to your GitHub account
2. Or clone and create new repo
```

### Step 3: Vercel (5 minutes)
```bash
1. Go to vercel.com → Sign up with GitHub
2. Import your forked repository
3. Add environment variables:
   - SUPABASE_URL=your-supabase-url
   - SUPABASE_ANON_KEY=your-supabase-key
   - NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   - NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
   - ADMIN_USERNAME=admin
   - ADMIN_PASSWORD=your-secure-password
4. Click Deploy
```

### Step 4: Test (3 minutes)
```bash
1. Visit your Vercel URL
2. Take the quiz
3. Check /admin/login with your credentials
4. Edit content at /admin/content
```

## 🔧 Environment Variables Template

Copy this to your Vercel environment variables:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJ...your-key-here
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

## ✅ Success Checklist

- [ ] Supabase project created and SQL script run
- [ ] GitHub repository forked/cloned
- [ ] Vercel deployment successful
- [ ] Environment variables set
- [ ] Quiz works end-to-end
- [ ] Admin login works
- [ ] Content editor accessible

## 🆘 Common Issues

**"Failed to fetch rules"**
→ Check environment variables in Vercel

**"Admin login not working"**
→ Verify ADMIN_USERNAME and ADMIN_PASSWORD are set

**"Database connection failed"**
→ Run the SQL schema script in Supabase

**"Tables missing"**
→ Check supabase-content-schema.sql was executed

## 📞 Need Help?

1. Check the full [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Use the [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
3. Run `node scripts/setup-database.js` to test your database

## 🎉 You're Done!

Your Story Finder app is now live and ready to use. You can:
- Edit questions and content via the admin panel
- View analytics and quiz results
- Customize the app to your needs

**Happy storytelling!** 📚✨
