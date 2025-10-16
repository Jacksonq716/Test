# 🚀 Deployment Guide

## Step 1: Setup Supabase Database ⚡ CRITICAL FIRST STEP

**You MUST do this before the app will work!**

1. Go to: https://nhdnjgozjcbdrarwliwg.supabase.co
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Open the file `supabase-setup.sql` in this project
5. **Copy ALL the content** from that file
6. **Paste it** into the Supabase SQL Editor
7. Click **Run** (or press Ctrl+Enter)
8. You should see: "Success. No rows returned"

✅ This creates 4 tables with sample data:
   - live_sessions
   - historical_sessions
   - doctor_notes
   - recovery_metrics

## Step 2: Test Locally (Optional)

```bash
npm run dev
```

Visit http://localhost:5173 to test

## Step 3: Deploy to Vercel (Get Shareable Link)

### Quick Deploy (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No**
   - Project name? Press Enter (uses pt-assessment-simulator)
   - Directory? Press Enter (uses current directory)
   - Override settings? **No**

5. After deployment, you'll get a URL like:
   ```
   https://pt-assessment-simulator-xxxxx.vercel.app
   ```

6. For production deployment:
```bash
vercel --prod
```

### Alternative: Deploy via Vercel Dashboard

1. Go to https://vercel.com
2. Click **Add New** → **Project**
3. Click **Browse** and select this folder
4. Vercel auto-detects Vite settings
5. Click **Deploy**
6. Wait 1-2 minutes
7. Get your URL!

## Step 4: Share & Test

✅ **Share the URL** with anyone
✅ Open in **multiple browser tabs/windows**
✅ Click the **+ button** to add data
✅ Watch **real-time sync** across all windows!

## Troubleshooting

### "No data showing"
- Did you run the SQL script in Supabase? Go back to Step 1!
- Check Supabase → Table Editor → Verify tables exist

### "Can't add data"
- Check browser console (F12) for errors
- Verify Supabase URL and key in `src/services/supabase.js`

### "Vercel deployment failed"
- Make sure you ran `npm install` first
- Check if Node.js version is 16+ (`node --version`)

## What You Get

📊 **Live Dashboard URL** - Share with anyone, works on any device
🔄 **Real-time Sync** - Multiple users can view/edit simultaneously  
📱 **Mobile Friendly** - Works on iPhone/iPad/Android
🎯 **Ready for Testing** - Pre-loaded with sample patient data

## Testing Workflow

1. Open URL on PT's iPhone
2. Share URL with test observer
3. PT views live session & historical data
4. Observer adds new data via + button
5. PT sees instant updates
6. Collect timing & accuracy metrics

---

**Need help?** Check README.md for detailed documentation
