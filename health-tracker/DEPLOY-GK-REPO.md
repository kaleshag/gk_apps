# Deploy Health & Habits Tracker from GK_Repo

## Your Setup

The app is now in your personal repo at:
```
/Users/gkalesha/GK/GK_Repo/apps/gk-health-tracker/
```

## Quick Deploy to GitHub Pages

### 1. Create App Icons (Required First)

Download icons from [favicon.io/emoji-favicons/](https://favicon.io/emoji-favicons/):
- Search for "green apple" 🍎
- Download package
- Rename and copy:
  ```bash
  # Rename downloaded files
  mv android-chrome-192x192.png icon-192.png
  mv android-chrome-512x512.png icon-512.png
  
  # Copy to app directory
  cp icon-192.png icon-512.png /Users/gkalesha/GK/GK_Repo/apps/gk-health-tracker/
  ```

### 2. Commit and Push to GitHub

```bash
cd /Users/gkalesha/GK/GK_Repo

# Add the new app
git add apps/gk-health-tracker/

# Commit
git commit -m "Add Health & Habits Tracker v1.0.0"

# Push to GitHub
git push origin main
```

### 3. Enable GitHub Pages (If Not Already Enabled)

1. Go to your GK_Repo on GitHub
2. Settings → Pages
3. Source: `main` branch, `/ (root)` folder
4. Save

### 4. Access Your App

Your app will be available at:
```
https://YOUR_USERNAME.github.io/GK_Repo/apps/gk-health-tracker/
```

**Example:** If your username is `kalesha-g`:
```
https://kalesha-g.github.io/GK_Repo/apps/gk-health-tracker/
```

### 5. Install on Mobile

#### iPhone/iPad:
1. Open **Safari** (must use Safari)
2. Visit your GitHub Pages URL
3. Tap Share button → "Add to Home Screen"
4. Name it "Health Tracker"
5. Tap "Add"

#### Android:
1. Open **Chrome**
2. Visit your GitHub Pages URL
3. Tap menu (⋮) → "Add to Home screen"
4. Tap "Install"

## Update the App

When you make changes:

```bash
cd /Users/gkalesha/GK/GK_Repo

# Make your changes to files in apps/gk-health-tracker/

# Commit and push
git add apps/gk-health-tracker/
git commit -m "Update Health & Habits Tracker: description of changes"
git push origin main

# GitHub Pages auto-deploys in 1-2 minutes
```

## File Structure

```
GK_Repo/
└── apps/
    └── gk-health-tracker/
        ├── index.html          # Main app page
        ├── style.css           # Styling
        ├── tracker.js          # App logic
        ├── manifest.json       # PWA config
        ├── service-worker.js   # Offline support
        ├── icon-192.png        # App icon (small)
        ├── icon-512.png        # App icon (large)
        ├── README.md           # Documentation
        └── DEPLOY-GK-REPO.md   # This file
```

## Features

✅ **Calorie Tracking** - Log food by meal type
✅ **Workout Logging** - Track exercises and calories burned
✅ **Water Intake** - 4L daily goal with quick add buttons
✅ **Steps Counter** - 10,000 daily goal
✅ **Sleep Tracking** - 7-8h optimal range
✅ **Daily Habits** - Custom habit checklist
✅ **History** - View past days' data
✅ **PWA** - Install as native app
✅ **Offline** - Works without internet
✅ **Local Storage** - All data stays on your device

## Privacy

- All data stored locally in browser
- No data sent to any server
- Each device has its own data
- Use Export feature to backup

## Troubleshooting

### App Not Loading
- Wait 2-3 minutes after pushing to GitHub
- Clear browser cache
- Try incognito/private mode

### Icons Not Showing
- Make sure `icon-192.png` and `icon-512.png` exist
- Check file names are exact (lowercase)
- Clear cache and reload

### Can't Install on Mobile
- Must use HTTPS (GitHub Pages provides this)
- iOS: Must use Safari browser
- Android: Use Chrome or Samsung Internet

### Changes Not Appearing
- GitHub Pages can take 1-5 minutes to update
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache

## Support

For issues or questions:
- Check browser console (F12) for errors
- Verify all files are committed and pushed
- Ensure GitHub Pages is enabled

---

**Health & Habits Tracker v1.0.0**
**© 2026 GK (Kalesha Gagguturu). All rights reserved.**