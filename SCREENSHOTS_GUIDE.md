# Visual Documentation Guide

## Screenshots & GIFs Required

To complete the project submission, you need to capture the following screens and create GIFs demonstrating functionality.

### 1. Login Page (Screenshot)
**File:** `screenshots/01-login-page.png`

**What to capture:**
- Full login page with all three OAuth buttons (Google, Facebook, GitHub)
- Beautiful gradient background
- Clear branding

**How to capture:**
- Navigate to `http://localhost:3000/login`
- Press `F12` to open DevTools (optional - for better view)
- Take screenshot using Windows Snipping Tool or `Win + Shift + S`

---

### 2. Google OAuth Login (GIF)
**File:** `screenshots/02-google-oauth.gif`

**What to capture:**
1. Click "Continue with Google" button
2. Google consent screen
3. Select account
4. Redirect back to dashboard

**Suggested tool:** ScreenToGif (Windows), LICEcap, or Kap

---

### 3. Facebook OAuth Login (GIF)
**File:** `screenshots/03-facebook-oauth.gif`

**What to capture:**
1. Click "Continue with Facebook" button
2. Facebook login/consent
3. Redirect to dashboard

---

### 4. GitHub OAuth Login (GIF)
**File:** `screenshots/04-github-oauth.gif`

**What to capture:**
1. Click "Continue with GitHub" button
2. GitHub authorization
3. Redirect to dashboard

---

### 5. Dashboard - Initial View (Screenshot)
**File:** `screenshots/05-dashboard-initial.png`

**What to capture:**
- Header with user info
- Top Searches banner (if populated)
- Welcome message
- Search bar

---

### 6. Top Searches Banner (Screenshot)
**File:** `screenshots/06-top-searches.png`

**What to capture:**
- Clear view of top 5 searches
- Search counts
- Clickable badges

**Note:** You may need to perform several searches first to populate this

---

### 7. Search Results Grid (Screenshot)
**File:** `screenshots/07-search-results.png`

**What to capture:**
- Search term displayed
- Result count
- 4-column grid layout
- Multiple images visible

**Example search:** "nature" or "technology"

---

### 8. Multi-Select Feature (GIF)
**File:** `screenshots/08-multi-select.gif`

**What to capture:**
1. Hover over an image (shows overlay)
2. Click to select multiple images (3-5 images)
3. Show selection counter updating
4. Show visual feedback (border color change)

---

### 9. Image Hover State (Screenshot)
**File:** `screenshots/09-image-hover.png`

**What to capture:**
- Single image with hover overlay visible
- Checkbox visible
- Image info (photographer name, description)
- Gradient overlay

---

### 10. Selection Counter (Screenshot)
**File:** `screenshots/10-selection-counter.png`

**What to capture:**
- Search results with multiple images selected
- Clear view of "Selected X images" counter
- Highlighted selected images

---

### 11. Search History Sidebar (Screenshot)
**File:** `screenshots/11-search-history.png`

**What to capture:**
- Full search history section
- Multiple search entries with timestamps
- "Clear All" button
- Scroll behavior (if many items)

---

### 12. Complete Search Flow (GIF)
**File:** `screenshots/12-complete-flow.gif`

**What to capture:**
1. Type search term
2. Click search button
3. Results loading
4. Results displayed
5. History updated
6. Top searches updated

---

### 13. Mobile Responsive - Login (Screenshot)
**File:** `screenshots/13-mobile-login.png`

**What to capture:**
- Login page on mobile viewport (375px width)
- Use Chrome DevTools device emulation

**Steps:**
1. Press F12
2. Click device toolbar icon
3. Select iPhone or similar
4. Capture screenshot

---

### 14. Mobile Responsive - Dashboard (Screenshot)
**File:** `screenshots/14-mobile-dashboard.png`

**What to capture:**
- Dashboard on mobile
- 2-column or 1-column grid
- Responsive header

---

### 15. Tablet View (Screenshot)
**File:** `screenshots/15-tablet-view.png`

**What to capture:**
- Dashboard on tablet (768px width)
- 3-column grid
- iPad or similar device

---

## Tools Recommended

### For Screenshots (Windows)
- **Snipping Tool**: Built-in Windows tool (`Win + Shift + S`)
- **ShareX**: Free, feature-rich (https://getsharex.com/)
- **Greenshot**: Free, open-source

### For GIFs
- **ScreenToGif**: Free, powerful (https://www.screentogif.com/)
- **LICEcap**: Simple, lightweight (https://www.cockos.com/licecap/)
- **Kap**: Mac only (https://getkap.co/)

### Browser DevTools
- Chrome DevTools (F12) for responsive testing

## Creating the Screenshots Folder

```bash
# Create screenshots directory
mkdir screenshots

# Or create in PowerShell
New-Item -ItemType Directory -Path screenshots
```

## Quality Guidelines

### Screenshots
- **Resolution**: At least 1920x1080 for desktop views
- **Format**: PNG for quality
- **File Size**: Optimize (use TinyPNG.com if needed)
- **Annotations**: Use arrows/boxes to highlight key features (optional)

### GIFs
- **Duration**: 5-15 seconds each
- **Frame Rate**: 15-30 fps
- **Resolution**: 1280x720 or 1920x1080
- **File Size**: < 10MB (optimize if needed)
- **Speed**: Normal speed, not too fast

## README Integration

After creating all screenshots, update README.md:

```markdown
## 📸 Visual Proof

### Authentication
![Login Page](screenshots/01-login-page.png)
![Google OAuth](screenshots/02-google-oauth.gif)

### Dashboard & Search
![Dashboard](screenshots/05-dashboard-initial.png)
![Top Searches](screenshots/06-top-searches.png)
![Search Results](screenshots/07-search-results.png)

### Multi-Select Feature
![Multi-Select](screenshots/08-multi-select.gif)
![Selection Counter](screenshots/10-selection-counter.png)

### Search History
![Search History](screenshots/11-search-history.png)

### Complete Flow
![Complete Search Flow](screenshots/12-complete-flow.gif)

### Responsive Design
![Mobile Login](screenshots/13-mobile-login.png)
![Mobile Dashboard](screenshots/14-mobile-dashboard.png)
![Tablet View](screenshots/15-tablet-view.png)
```

## Checklist

- [ ] Created `screenshots` folder
- [ ] Captured login page screenshot
- [ ] Created Google OAuth GIF
- [ ] Created Facebook OAuth GIF
- [ ] Created GitHub OAuth GIF
- [ ] Captured dashboard initial view
- [ ] Captured top searches banner
- [ ] Captured search results grid
- [ ] Created multi-select GIF
- [ ] Captured image hover state
- [ ] Captured selection counter
- [ ] Captured search history
- [ ] Created complete search flow GIF
- [ ] Captured mobile login view
- [ ] Captured mobile dashboard
- [ ] Captured tablet view
- [ ] Updated README.md with screenshots
- [ ] Optimized all images for file size
- [ ] Tested all image links in README

## Tips

1. **Clear Data**: Clear cookies/localStorage before recording OAuth flows
2. **Good Lighting**: Use screenshots with good contrast
3. **Real Data**: Use real searches to show authentic results
4. **Smooth GIFs**: Close unnecessary tabs to avoid lag
5. **Annotations**: Add arrows/highlights to emphasize features
6. **Consistency**: Use same browser/theme for all screenshots
