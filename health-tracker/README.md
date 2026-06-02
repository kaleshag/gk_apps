# Health & Habits Tracker

A Progressive Web App (PWA) for tracking food, calories, workouts, water intake, steps, sleep, and daily habits.

**© 2026 GK (Kalesha Gagguturu). All rights reserved.**

## Features

- 📊 Calorie tracking with meal categorization
- 💪 Workout logging with calories burned
- 💧 Water intake tracking (4L daily goal)
- 🚶 Steps counter (10,000 daily goal)
- 😴 Sleep tracking (7-8h optimal)
- ✅ Daily habits checklist
- 📈 History tracking with daily summaries
- 📱 Works offline as a PWA
- 💾 Data stored locally in browser

## Installation on Mobile

### Option 1: Deploy to GitHub Pages (Recommended)

1. **Create a GitHub repository:**
   ```bash
   cd /Users/gkalesha/GK/GK_Repo/apps/gk-health-tracker
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/health-tracker.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Save

3. **Access on mobile:**
   - Visit: `https://YOUR_USERNAME.github.io/GK_Repo/apps/gk-health-tracker/`
   - Tap browser menu → "Add to Home Screen"
   - App will install and work offline

### Option 2: Use Netlify (Free)

1. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `gk-health-tracker` folder
   - Get instant URL like `https://health-tracker.netlify.app`

2. **Install on mobile:**
   - Visit the Netlify URL
   - Tap "Add to Home Screen"

### Option 3: Local Network Access

1. **Start a local server:**
   ```bash
   cd /Users/gkalesha/GK/GK_Repo/apps/gk-health-tracker
   python3 -m http.server 8000
   ```

2. **Find your computer's IP:**
   ```bash
   # On Mac/Linux:
   ifconfig | grep "inet "
   # Look for something like 192.168.1.x
   ```

3. **Access from mobile:**
   - Connect mobile to same WiFi
   - Visit: `http://YOUR_IP:8000`
   - Add to Home Screen

## App Icons

The app needs icons for installation. Create these images:

- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

You can use any image editor or online tool like:
- [Favicon.io](https://favicon.io)
- [RealFaviconGenerator](https://realfavicongenerator.net)

Use the 🍎 emoji or create a custom logo with "GK" text.

## Browser Support

- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Safari (iOS & macOS)
- ✅ Firefox
- ✅ Samsung Internet

## Data Privacy

- All data stored locally in browser
- No data sent to any server
- Export feature available for backup
- Clear data anytime from Settings

## Version

Current version: **v1.0.0**

## License

© 2026 GK (Kalesha Gagguturu). All rights reserved.