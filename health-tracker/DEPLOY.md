# Deploy GK Health Tracker to GitHub Pages

## Step-by-Step Guide

### 1. Create App Icons (Required)

Before deploying, create two icon files:

**Quick Method - Use Emoji:**
1. Go to [favicon.io/emoji-favicons/](https://favicon.io/emoji-favicons/)
2. Search for "green apple" 🍎
3. Download the package
4. Rename files:
   - `android-chrome-192x192.png` → `icon-192.png`
   - `android-chrome-512x512.png` → `icon-512.png`
5. Copy both files to `/Users/gkalesha/GK/gk-python-local/food-tracker/`

**Or Create Custom "GK" Logo:**
1. Go to [canva.com](https://canva.com)
2. Create 512x512px design with "GK" text
3. Export as PNG
4. Resize to create both 192x192 and 512x512 versions

### 2. Initialize Git Repository

```bash
cd /Users/gkalesha/GK/gk-python-local/food-tracker

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: GK Health Tracker v1.0.0"

# Set main branch
git branch -M main
```

### 3. Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click "+" → "New repository"
3. Repository name: `gk-health-tracker`
4. Description: "Personal health and habits tracking PWA"
5. Make it **Public** (required for free GitHub Pages)
6. **DO NOT** initialize with README (we already have one)
7. Click "Create repository"

### 4. Push to GitHub

```bash
# Add GitHub as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/gk-health-tracker.git

# Push code
git push -u origin main
```

### 5. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll to "Pages" in left sidebar
4. Under "Source":
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save"
6. Wait 1-2 minutes for deployment

### 6. Access Your App

Your app will be available at:
```
https://YOUR_USERNAME.github.io/gk-health-tracker/
```

**Note:** If you see 404, wait a few minutes and refresh.

### 7. Install on Mobile

#### iPhone/iPad:
1. Open Safari (must use Safari, not Chrome)
2. Visit your GitHub Pages URL
3. Tap the Share button (square with arrow)
4. Scroll down and tap "Add to Home Screen"
5. Name it "GK Health"
6. Tap "Add"

#### Android:
1. Open Chrome
2. Visit your GitHub Pages URL
3. Tap the menu (three dots)
4. Tap "Add to Home screen" or "Install app"
5. Tap "Install"

### 8. Update the App Later

When you make changes:

```bash
cd /Users/gkalesha/GK/gk-python-local/food-tracker

# Make your changes to files...

# Commit changes
git add .
git commit -m "Update: description of changes"

# Push to GitHub
git push

# GitHub Pages will auto-deploy in 1-2 minutes
```

### 9. Custom Domain (Optional)

If you own a domain like `health.yourdomain.com`:

1. In repository Settings → Pages
2. Add your custom domain
3. Update your domain's DNS settings:
   - Add CNAME record pointing to `YOUR_USERNAME.github.io`

## Troubleshooting

### Icons Not Showing
- Make sure `icon-192.png` and `icon-512.png` exist in root folder
- Clear browser cache and reload

### Service Worker Not Registering
- GitHub Pages uses HTTPS (required for PWA)
- Check browser console for errors
- Make sure all file paths in `service-worker.js` are correct

### App Not Installing on Mobile
- Must use HTTPS (GitHub Pages provides this)
- Try clearing browser cache
- On iOS, must use Safari browser

### Changes Not Appearing
- GitHub Pages can take 1-5 minutes to update
- Clear browser cache
- Try incognito/private mode

## Benefits of GitHub Pages

✅ **Free hosting**
✅ **Automatic HTTPS**
✅ **Custom domain support**
✅ **Automatic deployments**
✅ **Works as PWA**
✅ **No server maintenance**

## Privacy & Data

- All user data stored locally in browser
- No data sent to GitHub or any server
- Each device has its own data
- Use Export feature to backup data

---

**© 2026 Kalesha Gagguturu. All rights reserved.**