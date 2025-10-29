# Deployment Guide

## Deployment Options

### Option 1: Deploy to Heroku

#### Prerequisites
- Heroku account
- Heroku CLI installed

#### Steps

1. **Install Heroku CLI**
```bash
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
heroku create your-app-name
```

4. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI="your-mongodb-atlas-uri"
heroku config:set SESSION_SECRET="your-secret"
heroku config:set UNSPLASH_ACCESS_KEY="your-key"
heroku config:set GOOGLE_CLIENT_ID="your-id"
heroku config:set GOOGLE_CLIENT_SECRET="your-secret"
heroku config:set FACEBOOK_APP_ID="your-id"
heroku config:set FACEBOOK_APP_SECRET="your-secret"
heroku config:set GITHUB_CLIENT_ID="your-id"
heroku config:set GITHUB_CLIENT_SECRET="your-secret"
heroku config:set NODE_ENV="production"
```

5. **Update OAuth Callback URLs**
Update in each provider's settings:
- Google: `https://your-app-name.herokuapp.com/auth/google/callback`
- Facebook: `https://your-app-name.herokuapp.com/auth/facebook/callback`
- GitHub: `https://your-app-name.herokuapp.com/auth/github/callback`

6. **Create Procfile**
```bash
echo "web: cd server && npm start" > Procfile
```

7. **Deploy**
```bash
git add .
git commit -m "Ready for deployment"
git push heroku main
```

8. **Open App**
```bash
heroku open
```

### Option 2: Deploy Frontend to Vercel, Backend to Render

#### Frontend (Vercel)

1. **Build Frontend**
```bash
cd client
npm run build
```

2. **Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

3. **Configure Vercel**
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

#### Backend (Render)

1. **Create Render Account** at https://render.com

2. **Create New Web Service**
- Repository: Link your GitHub repo
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`

3. **Set Environment Variables** in Render dashboard

4. **Update CLIENT_URL** to your Vercel URL

### Option 3: Deploy to Railway

1. **Create Railway Account** at https://railway.app

2. **Deploy Backend**
- New Project → Deploy from GitHub
- Select your repository
- Add environment variables
- Railway will auto-detect and deploy

3. **Deploy Frontend**
- Add new service
- Select same repository
- Set root directory to `client`
- Add build command: `npm run build`

### Option 4: DigitalOcean App Platform

1. **Create DigitalOcean Account**

2. **Create New App**
- Connect GitHub repository
- Detect components (backend and frontend)

3. **Configure Backend**
- Type: Web Service
- Source Directory: `/server`
- Build Command: `npm install`
- Run Command: `npm start`

4. **Configure Frontend**
- Type: Static Site
- Source Directory: `/client`
- Build Command: `npm run build`
- Output Directory: `build`

5. **Add Environment Variables**

## Production Checklist

### Security
- [ ] Generate strong SESSION_SECRET
- [ ] Use HTTPS in production
- [ ] Set secure cookie options
- [ ] Enable CORS only for your domain
- [ ] Rate limit API endpoints
- [ ] Sanitize user inputs
- [ ] Keep dependencies updated

### Database
- [ ] Use MongoDB Atlas (production cluster)
- [ ] Enable authentication
- [ ] Whitelist only necessary IPs
- [ ] Set up automated backups
- [ ] Create database indexes

### OAuth Configuration
- [ ] Update all callback URLs to production URLs
- [ ] Verify OAuth app settings
- [ ] Test all OAuth providers in production

### Monitoring
- [ ] Set up error logging (Sentry, LogRocket)
- [ ] Monitor API usage
- [ ] Set up uptime monitoring
- [ ] Configure alerts

### Performance
- [ ] Enable gzip compression
- [ ] Use CDN for static assets
- [ ] Optimize images
- [ ] Enable caching
- [ ] Monitor response times

## Environment Variables for Production

```env
# Production MongoDB Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname

# Server Configuration
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com

# Strong Session Secret (use crypto.randomBytes(32).toString('hex'))
SESSION_SECRET=generated-random-secret-here

# Unsplash API
UNSPLASH_ACCESS_KEY=your-production-key

# Google OAuth (with production callback URL)
GOOGLE_CLIENT_ID=your-production-client-id
GOOGLE_CLIENT_SECRET=your-production-client-secret

# Facebook OAuth (with production callback URL)
FACEBOOK_APP_ID=your-production-app-id
FACEBOOK_APP_SECRET=your-production-app-secret

# GitHub OAuth (with production callback URL)
GITHUB_CLIENT_ID=your-production-client-id
GITHUB_CLIENT_SECRET=your-production-client-secret
```

## Post-Deployment Testing

1. **Test OAuth Login**
   - Try all three providers
   - Verify redirects work correctly
   - Check user data is saved

2. **Test API Endpoints**
   - Search functionality
   - Top searches
   - Search history
   - Clear history

3. **Test Mobile Responsiveness**
   - iPhone/Android
   - Tablet
   - Different browsers

4. **Performance Testing**
   - Load time
   - API response times
   - Image loading

5. **Security Testing**
   - Try accessing protected routes without login
   - Test CORS
   - Check for exposed secrets

## Troubleshooting Production Issues

### OAuth Redirect Not Working
- Verify callback URLs in provider settings
- Check CLIENT_URL environment variable
- Ensure HTTPS is enabled

### Database Connection Failed
- Check MongoDB Atlas whitelist
- Verify connection string
- Check database user permissions

### Session Not Persisting
- Verify SESSION_SECRET is set
- Check cookie settings for production
- Ensure MongoDB session store is connected

### Images Not Loading
- Check CORS settings
- Verify Unsplash API key
- Check API rate limits

## Scaling Considerations

### Horizontal Scaling
- Use load balancer
- Implement sticky sessions
- Share session store across instances

### Database Scaling
- MongoDB Atlas auto-scaling
- Read replicas for heavy read operations
- Proper indexing

### Caching
- Redis for session storage
- Cache frequently accessed data
- CDN for static assets

### Rate Limiting
```javascript
// Install: npm install express-rate-limit
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Maintenance

### Regular Updates
```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Audit security
npm audit
npm audit fix
```

### Backup Strategy
- Automated daily backups (MongoDB Atlas)
- Keep backups for 30 days
- Test restore procedures

### Monitoring
- Set up application monitoring (New Relic, Datadog)
- Log aggregation (Papertrail, Loggly)
- Error tracking (Sentry)
- Uptime monitoring (UptimeRobot, Pingdom)
