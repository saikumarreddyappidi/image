# 🔧 Google OAuth Troubleshooting Guide

## ❌ Problem: Getting 404 Error from Google

This happens when the redirect URI doesn't match exactly.

---

## ✅ SOLUTION - Step by Step:

### **Step 1: Go to Google Cloud Console**
Open: https://console.cloud.google.com/apis/credentials

### **Step 2: Find Your OAuth Client**
Look for the client with ID: `441356524113-sg3jdukav5eduoqv3kfbvrkdb7ps4pj3`

### **Step 3: Click on the Client Name**
This will open the details page

### **Step 4: Check "Authorized redirect URIs"**
You should see a section called "Authorized redirect URIs"

### **Step 5: It MUST have EXACTLY this:**
```
http://localhost:5000/auth/google/callback
```

### **Step 6: If it's missing or different:**
1. Click the **EDIT** button (top right)
2. Scroll to "Authorized redirect URIs"
3. Click **"+ ADD URI"**
4. Type EXACTLY: `http://localhost:5000/auth/google/callback`
5. Click **SAVE** at the bottom
6. **WAIT 2-5 MINUTES** (Google needs time to update)

### **Step 7: Also add JavaScript Origins:**
In the same edit screen:
1. Find "Authorized JavaScript origins"
2. Click **"+ ADD URI"**
3. Type: `http://localhost:3000`
4. Click **SAVE**

---

## 🔍 Common Mistakes:

❌ `https://localhost:5000/auth/google/callback` - Wrong! Must be `http://`
❌ `http://localhost:5000/auth/google/callback/` - Wrong! No trailing slash
❌ `http://127.0.0.1:5000/auth/google/callback` - Wrong! Must be `localhost`
❌ Missing the URI completely

✅ CORRECT: `http://localhost:5000/auth/google/callback`

---

## 🧪 Test After Setup:

1. Wait 2-5 minutes after saving
2. Restart your app: `npm run dev`
3. Go to: http://localhost:3000
4. Click "Continue with Google"
5. Should redirect to Google login (not 404)

---

## 📸 What You Should See in Google Console:

**Authorized JavaScript origins:**
- `http://localhost:3000`

**Authorized redirect URIs:**
- `http://localhost:5000/auth/google/callback`

---

## 🆘 Still Not Working?

Try creating a NEW OAuth client:
1. In Google Cloud Console > Credentials
2. Click "+ CREATE CREDENTIALS"
3. Choose "OAuth client ID"
4. Application type: "Web application"
5. Name: "MERN Image Search v2"
6. Add both URIs from above
7. Copy the NEW Client ID and Secret
8. Update your .env file with the new credentials

---

## ✅ Current Configuration in Your App:

**File:** `server/.env`
```
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE
```

**File:** `server/config/passport.js`
```javascript
callbackURL: 'http://localhost:5000/auth/google/callback'
```

**These MUST match what's in Google Cloud Console!**

---

## 📞 Need More Help?

Screenshot what you see in Google Cloud Console under:
- Authorized JavaScript origins
- Authorized redirect URIs

And share it so I can verify the exact configuration!
