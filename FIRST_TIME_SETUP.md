# First-Time Setup Instructions

## Welcome! 🎉

Follow these steps to get your MERN Image Search application up and running.

## Step 1: Install Prerequisites

### Required Software

1. **Node.js** (v14 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **MongoDB**
   - Option A (Recommended): MongoDB Atlas (Cloud - Free)
     - Sign up: https://www.mongodb.com/cloud/atlas
   - Option B: MongoDB Local
     - Download: https://www.mongodb.com/try/download/community

3. **Git**
   - Download: https://git-scm.com/
   - Verify: `git --version`

## Step 2: Get API Keys

### 2.1 Unsplash API (Required)

1. Go to: https://unsplash.com/developers
2. Sign up or log in
3. Click "New Application"
4. Accept terms and create application
5. Copy your **Access Key**
6. Save it - you'll need it for `.env`

### 2.2 Google OAuth (Required)

1. Go to: https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Configure OAuth consent screen
6. Create OAuth 2.0 Client ID
7. Application type: **Web application**
8. Authorized redirect URIs: `http://localhost:5000/auth/google/callback`
9. Copy **Client ID** and **Client Secret**

### 2.3 Facebook OAuth (Required)

1. Go to: https://developers.facebook.com/apps/
2. Click "Create App"
3. Type: **Consumer**
4. Add product: **Facebook Login**
5. Settings → Basic: Copy **App ID** and **App Secret**
6. Facebook Login → Settings:
   - Valid OAuth Redirect URIs: `http://localhost:5000/auth/facebook/callback`
7. Make app live (toggle in top menu)

### 2.4 GitHub OAuth (Required)

1. Go to: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - Application name: MERN Image Search
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:5000/auth/github/callback`
4. Register application
5. Copy **Client ID**
6. Generate **Client Secret** and copy it

## Step 3: Project Setup

### 3.1 Clone/Download Project

```powershell
# If you have the project folder, navigate to it
cd C:\Users\saiku\OneDrive\Desktop\STUDIO

# Or if cloning from Git
# git clone <repository-url>
# cd mern-image-search
```

### 3.2 Install Dependencies

```powershell
# Install all dependencies (root, server, client)
npm run install-all
```

This will take a few minutes. ☕

## Step 4: Configure Environment Variables

### 4.1 Create .env File

```powershell
# Navigate to server folder
cd server

# Copy the example file
copy .env.example .env

# Open in Notepad
notepad .env
```

### 4.2 Fill in Your API Keys

Replace the placeholder values with your actual keys:

```env
# MongoDB (Choose one)
# Option A: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/mern-image-search

# Option B: MongoDB Atlas (recommended)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-image-search

# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Generate a random string for session secret
SESSION_SECRET=mysupersecretkey123change

# Unsplash (PASTE YOUR KEY HERE)
UNSPLASH_ACCESS_KEY=YOUR_UNSPLASH_ACCESS_KEY

# Google OAuth (PASTE YOUR KEYS HERE)
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# Facebook OAuth (PASTE YOUR KEYS HERE)
FACEBOOK_APP_ID=YOUR_FACEBOOK_APP_ID
FACEBOOK_APP_SECRET=YOUR_FACEBOOK_APP_SECRET

# GitHub OAuth (PASTE YOUR KEYS HERE)
GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
```

**IMPORTANT**: Replace ALL placeholder values with your actual keys!

## Step 5: Start MongoDB

### If using MongoDB Local:

```powershell
# Start MongoDB service
mongod
```

Leave this terminal open.

### If using MongoDB Atlas:

No action needed - just use your connection string in `.env`

## Step 6: Start the Application

### Option A: Start Both Frontend & Backend (Recommended)

```powershell
# Navigate to project root
cd C:\Users\saiku\OneDrive\Desktop\STUDIO

# Start both
npm run dev
```

### Option B: Start Separately

**Terminal 1 - Backend:**
```powershell
cd C:\Users\saiku\OneDrive\Desktop\STUDIO
npm run server
```

**Terminal 2 - Frontend:**
```powershell
cd C:\Users\saiku\OneDrive\Desktop\STUDIO
npm run client
```

## Step 7: Access the Application

1. Wait for both servers to start (you'll see success messages)
2. Open browser and go to: **http://localhost:3000**
3. You should see the login page!

## Step 8: Test OAuth Login

1. Click "Continue with Google" (or Facebook/GitHub)
2. Sign in with your account
3. Grant permissions
4. You should be redirected to the dashboard!

## Step 9: Test Search

1. In the search bar, type: **"nature"**
2. Click Search
3. You should see beautiful images!
4. Try selecting multiple images
5. Check your search history on the right

## 🎉 Success!

You're now running the MERN Image Search application!

## Troubleshooting

### Problem: "Cannot connect to MongoDB"

**Solution:**
- If using local: Make sure `mongod` is running
- If using Atlas: 
  - Check connection string
  - Whitelist your IP in Atlas dashboard

### Problem: "Port 5000 already in use"

**Solution:**
```powershell
npx kill-port 5000
```

### Problem: "OAuth redirect error"

**Solution:**
- Verify callback URLs in provider settings
- Should be: `http://localhost:5000/auth/PROVIDER/callback`
- Clear browser cookies and try again

### Problem: "Module not found"

**Solution:**
```powershell
# Reinstall dependencies
cd server
rm -rf node_modules
npm install

cd ../client
rm -rf node_modules
npm install
```

### Problem: "Unsplash API error"

**Solution:**
- Verify your API key is correct
- Check if you've exceeded rate limit (50/hour for demo)
- Make sure no extra spaces in `.env` file

## Next Steps

1. ✅ Application is running
2. 📸 Create screenshots (see SCREENSHOTS_GUIDE.md)
3. 🚀 Deploy to production (see DEPLOYMENT.md)
4. 📝 Customize and extend features

## Need Help?

- Check `README.md` for full documentation
- Check `QUICK_REFERENCE.md` for common commands
- Check `TROUBLESHOOTING.md` for common issues
- Create an issue on GitHub

## Important Files

- `.env` - Your API keys (NEVER commit this!)
- `README.md` - Full documentation
- `QUICK_REFERENCE.md` - Quick commands
- `API_EXAMPLES.md` - API testing examples
- `DEPLOYMENT.md` - How to deploy

---

**Enjoy building with the MERN stack! 🚀**
