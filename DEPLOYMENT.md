# Deployment Guide - Vercel

This guide will help you deploy the YouTube Blog Generator to Vercel.

## Quick Deploy (Recommended)

### Option 1: Deploy via Vercel Dashboard

1. **Sign in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Repository**
   - Click "Add New Project"
   - Select `youtube-blog-generator` from your GitHub repositories
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Environment Variables** (Optional)
   - Currently not needed (API key entered via UI)
   - For future backend proxy, add: `GEMINI_API_KEY`

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build completion
   - Your app will be live at: `https://your-project.vercel.app`

---

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
cd /Users/musfiqurtuhin/Documents/WorkSpace/youtube-infographic-blog
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? youtube-blog-generator
# - Directory? ./
# - Override settings? No

# Your app will be deployed!
```

---

### Option 3: One-Click Deploy Button

Add this to your GitHub README:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MusfiqurTuhin/youtube-blog-generator)

---

## Post-Deployment

### Your Live URLs

After deployment, you'll get:
- **Production**: `https://youtube-blog-generator.vercel.app`
- **Preview**: Automatic for every pull request
- **Development**: `https://youtube-blog-generator-dev.vercel.app`

### Testing Your Deployment

1. Visit your production URL
2. Enter your Gemini API key
3. Select a model (Gemini 3 Flash recommended)
4. Paste a YouTube URL
5. Generate a blog post
6. Export as HTML

### Custom Domain (Optional)

1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain (e.g., `blog-generator.yourdomain.com`)
4. Follow DNS configuration instructions

---

## Environment Variables (Future)

For production with backend API proxy:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   ```
   GEMINI_API_KEY=your_actual_api_key
   ```
3. Redeploy the application

---

## Automatic Deployments

Vercel automatically deploys:
- ✅ **Production**: Every push to `main` branch
- ✅ **Preview**: Every pull request
- ✅ **Rollback**: Instant rollback from dashboard

---

## Build Configuration

The project uses:
- **Framework**: Next.js 16.1.1
- **Node Version**: 18.x (auto-detected)
- **Package Manager**: npm
- **Build Output**: `.next` directory

Build settings are in:
- `package.json` - Scripts and dependencies
- `vercel.json` - Vercel-specific configuration
- `next.config.ts` - Next.js configuration

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### App Deployed but Not Working
- Check browser console for errors
- Verify API key is entered correctly
- Test with different Gemini models

### Performance Issues
- Enable Edge Functions in Vercel settings
- Use Image Optimization
- Enable Analytics for monitoring

---

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **GitHub Issues**: https://github.com/MusfiqurTuhin/youtube-blog-generator/issues

---

**Ready to Deploy!** 🚀

Your project is now fully configured for Vercel deployment.
