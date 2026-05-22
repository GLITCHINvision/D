# Deployment Guide - Render

This guide explains how to deploy the "For the Future Doctor" app to Render.

## Prerequisites

1. **GitHub Account** - Already have your code pushed ✅
2. **Render Account** - Create free account at https://render.com
3. **Connected GitHub** - Link your GitHub to Render

## Deployment Steps

### Step 1: Sign Up / Log In to Render
1. Go to https://render.com
2. Click "Get Started" or "Sign In"
3. Sign in with GitHub (recommended for easier deployment)

### Step 2: Connect Your GitHub Repository
1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Select **"Build and deploy from a Git repository"**
3. Click **"Connect account"** to authorize GitHub
4. Search for and select repository: **`GLITCHINvision/D`**

### Step 3: Configure Deployment Settings

In the Render dashboard, set these values:

| Setting | Value |
|---------|-------|
| **Name** | `D` (or any custom name) |
| **Environment** | `Static Site` |
| **Build Command** | `npm run build` |
| **Publish Directory** | `dist` |
| **Branch** | `main` |

### Step 4: Configure Environment Variables (Optional)
1. Under "Environment Variables", add if needed:
   - Key: `NODE_VERSION`
   - Value: `18.17.0`

### Step 5: Deploy!
1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repo
   - Install dependencies (`npm install`)
   - Build the project (`npm run build`)
   - Deploy the static files from `/dist` folder

### Step 6: Get Your Live URL
After successful deployment (~2-3 minutes), you'll get a URL like:
```
https://d-xxxx.onrender.com
```

## What Gets Deployed

✅ All React components with animations  
✅ Confetti effects & Easter eggs  
✅ Kawaii cat companion  
✅ Ambient effects  
✅ Responsive design (mobile, tablet, desktop)  
✅ Audio effects  
✅ All styling & SVG assets  

## Updating Your Deployment

Any time you push to `main` branch:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

**Render automatically rebuilds and deploys!** 🚀

## Troubleshooting

### Build fails?
- Check that `package.json` has all dependencies
- Verify `npm run build` works locally
- Check Node version (should be 18+)

### Styles not loading?
- Clear browser cache
- Check that CSS imports are correct
- Verify vite.config.js is present

### Images/assets not showing?
- Ensure relative paths use `/` not `\`
- Check that `public/` folder is properly structured

## Manual Redeploy
If needed, in Render dashboard:
1. Go to your service
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

## Custom Domain (Premium)
1. Go to service settings
2. Under "Custom Domain", add your domain
3. Update DNS records as instructed

## Free Tier Limits
- ✅ Free static site hosting
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ⚠️ Spins down after 15 minutes inactivity (restarts on next visit)

---

**Deployment Status:** You're ready to go! 🎉
