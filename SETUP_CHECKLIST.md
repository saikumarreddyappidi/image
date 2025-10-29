# MERN Image Search - Setup Checklist

## ✅ Pre-Setup Requirements

- [ ] Node.js installed (v14+)
- [ ] MongoDB installed or Atlas account created
- [ ] Code editor (VS Code recommended)
- [ ] Git installed

## ✅ API Keys & OAuth Setup

### Unsplash API
- [ ] Created account at https://unsplash.com/developers
- [ ] Created new application
- [ ] Copied Access Key
- [ ] Added to .env file

### Google OAuth
- [ ] Created project at https://console.cloud.google.com/
- [ ] Enabled Google+ API
- [ ] Created OAuth 2.0 credentials
- [ ] Added redirect URI: `http://localhost:5000/auth/google/callback`
- [ ] Copied Client ID and Secret
- [ ] Added to .env file

### Facebook OAuth
- [ ] Created app at https://developers.facebook.com/apps/
- [ ] Added Facebook Login product
- [ ] Added redirect URI: `http://localhost:5000/auth/facebook/callback`
- [ ] Copied App ID and Secret
- [ ] Added to .env file

### GitHub OAuth
- [ ] Created OAuth App at https://github.com/settings/developers
- [ ] Set callback URL: `http://localhost:5000/auth/github/callback`
- [ ] Copied Client ID and Secret
- [ ] Added to .env file

## ✅ Installation Steps

- [ ] Cloned repository
- [ ] Ran `npm install` in root directory
- [ ] Ran `npm install` in server directory
- [ ] Ran `npm install` in client directory
- [ ] Created `.env` file in server directory
- [ ] Configured all environment variables

## ✅ Database Setup

- [ ] MongoDB running (local or Atlas)
- [ ] Connection string added to .env
- [ ] Database connection tested

## ✅ Testing Checklist

- [ ] Backend server starts successfully
- [ ] Frontend app starts successfully
- [ ] Google OAuth login works
- [ ] Facebook OAuth login works
- [ ] GitHub OAuth login works
- [ ] Image search returns results
- [ ] Multi-select images works
- [ ] Top searches displays correctly
- [ ] Search history saves and displays
- [ ] Clear history works
- [ ] Logout works

## ✅ Production Checklist (Optional)

- [ ] Changed SESSION_SECRET to strong random string
- [ ] Set NODE_ENV to 'production'
- [ ] Updated OAuth callback URLs for production domain
- [ ] Built frontend: `npm run build`
- [ ] Configured production MongoDB
- [ ] Set up hosting (Heroku, Vercel, etc.)

## 📝 Quick Start Commands

```bash
# Install all dependencies
npm run install-all

# Run development mode (both frontend & backend)
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client
```

## 🆘 Common Issues

**Port already in use:**
```bash
npx kill-port 5000
npx kill-port 3000
```

**MongoDB connection failed:**
- Check if MongoDB is running
- Verify connection string in .env
- For Atlas: whitelist IP address

**OAuth not working:**
- Verify callback URLs match exactly
- Check client IDs and secrets
- Clear browser cookies and try again

**Unsplash API errors:**
- Check API key is valid
- Note: Demo keys have 50 requests/hour limit
- Verify internet connection

## 📧 Need Help?

Create an issue in the GitHub repository with:
- Error message
- Steps to reproduce
- Your environment (OS, Node version, etc.)
