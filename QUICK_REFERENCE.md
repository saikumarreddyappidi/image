# Quick Reference Card

## 🚀 Essential Commands

### Install & Start
```bash
# Install all dependencies
npm run install-all

# Start development (both frontend & backend)
npm run dev

# Start backend only
npm run server

# Start frontend only
npm run client
```

### Production Build
```bash
cd client
npm run build
```

## 🔑 Environment Variables (.env in server/)

```env
MONGODB_URI=mongodb://localhost:27017/mern-image-search
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
SESSION_SECRET=your-secret-here
UNSPLASH_ACCESS_KEY=your-key-here
GOOGLE_CLIENT_ID=your-id-here
GOOGLE_CLIENT_SECRET=your-secret-here
FACEBOOK_APP_ID=your-id-here
FACEBOOK_APP_SECRET=your-secret-here
GITHUB_CLIENT_ID=your-id-here
GITHUB_CLIENT_SECRET=your-secret-here
```

## 📡 API Endpoints

### Auth (No authentication needed)
- `GET /auth/google` → Start Google login
- `GET /auth/facebook` → Start Facebook login
- `GET /auth/github` → Start GitHub login
- `GET /auth/current-user` → Check auth status
- `GET /auth/logout` → Logout

### API (Authentication required)
- `GET /api/top-searches` → Get top 5 searches
- `POST /api/search` → Search images
  - Body: `{ term: "nature" }`
- `GET /api/history?limit=50` → Get search history
- `DELETE /api/history` → Clear history

## 📂 Key Files

### Backend
- `server/server.js` → Main server file
- `server/config/passport.js` → OAuth config
- `server/models/User.js` → User schema
- `server/models/SearchTerm.js` → Search schema
- `server/routes/auth.js` → Auth routes
- `server/routes/api.js` → API routes
- `server/services/unsplash.js` → Unsplash API

### Frontend
- `client/src/App.js` → Main app & routing
- `client/src/components/Login.js` → Login page
- `client/src/components/Dashboard.js` → Main dashboard
- `client/src/components/ImageGrid.js` → Image display
- `client/src/components/SearchHistory.js` → History sidebar

## 🌐 URLs

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Login: http://localhost:3000/login
- Dashboard: http://localhost:3000/dashboard

## 🔧 Common Tasks

### Reset Database
```bash
# Open MongoDB shell
mongo

# Use your database
use mern-image-search

# Drop collections
db.users.drop()
db.searchterms.drop()
```

### Check Running Processes
```bash
# Windows PowerShell
Get-Process | Where-Object {$_.ProcessName -like "*node*"}

# Kill process on port
npx kill-port 5000
npx kill-port 3000
```

### View Logs
```bash
# Backend logs in terminal where server is running
# Frontend logs in browser console (F12)
```

### Test API with cURL
```bash
# Get current user
curl http://localhost:5000/auth/current-user

# Search (requires auth cookie)
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{"term": "nature"}'
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
npx kill-port 5000
npx kill-port 3000
```

### MongoDB Not Connected
```bash
# Start MongoDB
mongod

# Or check if running
mongo --eval "db.stats()"
```

### OAuth Not Working
1. Check callback URLs in provider settings
2. Verify CLIENT_URL in .env
3. Clear cookies and try again

### Can't Install Dependencies
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📊 Database Queries

```javascript
// Get all users
db.users.find()

// Get all searches
db.searchterms.find()

// Count searches by user
db.searchterms.aggregate([
  { $group: { _id: "$userId", count: { $sum: 1 } } }
])

// Get top searches
db.searchterms.aggregate([
  { $group: { _id: "$term", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 5 }
])
```

## 🎨 Component Props Quick Reference

### Dashboard
```javascript
<Dashboard 
  user={userObject} 
  onLogout={handleLogout} 
/>
```

### ImageGrid
```javascript
<ImageGrid 
  images={resultsArray}
  selectedImages={selectedIdsArray}
  onImageSelect={handleImageSelect}
/>
```

### SearchHistory
```javascript
<SearchHistory 
  history={historyArray}
  onSearchClick={handleSearch}
  onClearHistory={handleClear}
/>
```

## 📦 Package Versions

### Backend
- express: ^4.18.2
- mongoose: ^8.0.3
- passport: ^0.7.0
- axios: ^1.6.2

### Frontend
- react: ^18.2.0
- react-router-dom: ^6.20.1
- axios: ^1.6.2

## 🔐 OAuth Callback URLs

### Local Development
- Google: `http://localhost:5000/auth/google/callback`
- Facebook: `http://localhost:5000/auth/facebook/callback`
- GitHub: `http://localhost:5000/auth/github/callback`

### Production
Replace `localhost:5000` with your production domain

## 📝 Git Commands

```bash
# Initial commit
git init
git add .
git commit -m "Initial commit: MERN Image Search"

# Create GitHub repo and push
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

## 🎯 Testing Checklist

- [ ] MongoDB connected
- [ ] All dependencies installed
- [ ] .env file configured
- [ ] Server starts on port 5000
- [ ] Frontend starts on port 3000
- [ ] Google OAuth works
- [ ] Facebook OAuth works
- [ ] GitHub OAuth works
- [ ] Image search returns results
- [ ] Multi-select works
- [ ] Top searches displays
- [ ] Search history saves
- [ ] Logout works

## 📞 Quick Links

- Unsplash API: https://unsplash.com/developers
- Google Console: https://console.cloud.google.com/
- Facebook Developers: https://developers.facebook.com/
- GitHub Settings: https://github.com/settings/developers
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas

## 💡 Tips

1. **Keep terminals organized**: Backend in one terminal, frontend in another
2. **Use browser DevTools**: F12 for debugging
3. **Check network tab**: Monitor API calls
4. **Clear cookies**: If auth issues occur
5. **Use Postman**: For testing API endpoints
6. **Read console logs**: Most errors show there
7. **Check MongoDB**: Use MongoDB Compass for GUI

---

**Save this file for quick reference during development!**
