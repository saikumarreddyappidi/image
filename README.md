# 🖼️ Image Search Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application featuring OAuth authentication and Unsplash API integration for image search functionality.

## 📋 Features

- **OAuth Authentication**: Secure login via Google, Facebook, and GitHub using Passport.js
- **Image Search**: Search for high-quality images from Unsplash API
- **Multi-Select Grid**: Select multiple images with checkbox overlays in a responsive 4-column grid
- **Top Searches**: View the top 5 most searched terms across all users
- **Search History**: Personal search history with timestamps for each user
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile devices

## 🏗️ Project Structure

```
mern-image-search/
├── client/                      # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js     # Main dashboard component
│   │   │   ├── Dashboard.css
│   │   │   ├── Header.js        # Navigation header
│   │   │   ├── Header.css
│   │   │   ├── Login.js         # OAuth login page
│   │   │   ├── Login.css
│   │   │   ├── TopSearches.js   # Top searches banner
│   │   │   ├── TopSearches.css
│   │   │   ├── SearchBar.js     # Search input component
│   │   │   ├── SearchBar.css
│   │   │   ├── ImageGrid.js     # 4-column image grid with multi-select
│   │   │   ├── ImageGrid.css
│   │   │   ├── SearchHistory.js # User's search history
│   │   │   └── SearchHistory.css
│   │   ├── App.js               # Main app component with routing
│   │   ├── App.css
│   │   ├── index.js             # React entry point
│   │   └── index.css            # Global styles
│   └── package.json
│
├── server/                      # Express backend
│   ├── config/
│   │   └── passport.js          # Passport.js OAuth configuration
│   ├── models/
│   │   ├── User.js              # User model (OAuth data)
│   │   └── SearchTerm.js        # SearchTerm model (search history)
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   └── api.js               # API routes (search, history, top searches)
│   ├── services/
│   │   └── unsplash.js          # Unsplash API integration
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── server.js                # Express server entry point
│   ├── .env.example             # Environment variables template
│   └── package.json
│
├── package.json                 # Root package.json for scripts
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Unsplash API account
- OAuth credentials (Google, Facebook, GitHub)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mern-image-search
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
cd ..
```

### 3. MongoDB Setup

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service: `mongod`

**Option B: MongoDB Atlas (Cloud)**
- Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new cluster
- Get connection string

### 4. Get API Keys and OAuth Credentials

#### Unsplash API
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a new application
3. Copy your Access Key

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/auth/google/callback`
6. Copy Client ID and Client Secret

#### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/apps/)
2. Create a new app
3. Add Facebook Login product
4. Add Valid OAuth Redirect URIs: `http://localhost:5000/auth/facebook/callback`
5. Copy App ID and App Secret

#### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:5000/auth/github/callback`
4. Copy Client ID and Client Secret

### 5. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/mern-image-search
# Or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/mern-image-search

# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Session Secret (generate a random string)
SESSION_SECRET=your_random_session_secret_here_change_this

# Unsplash API
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Facebook OAuth
FACEBOOK_APP_ID=your_facebook_app_id_here
FACEBOOK_APP_SECRET=your_facebook_app_secret_here

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
```

### 6. Run the Application

#### Development Mode (Both Frontend & Backend)

From the root directory:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

#### Run Backend Only

```bash
npm run server
```

#### Run Frontend Only

```bash
npm run client
```

#### Production Build

```bash
cd client
npm run build
```

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/google` | Initiate Google OAuth login |
| GET | `/auth/google/callback` | Google OAuth callback |
| GET | `/auth/facebook` | Initiate Facebook OAuth login |
| GET | `/auth/facebook/callback` | Facebook OAuth callback |
| GET | `/auth/github` | Initiate GitHub OAuth login |
| GET | `/auth/github/callback` | GitHub OAuth callback |
| GET | `/auth/current-user` | Get current authenticated user |
| GET | `/auth/logout` | Logout current user |

### API Endpoints (Protected - Requires Authentication)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/top-searches` | Get top 5 search terms | - | `[{term, count, lastSearched}]` |
| POST | `/api/search` | Search images | `{term, page?, perPage?}` | `{searchTerm, total, totalPages, results}` |
| GET | `/api/history` | Get user's search history | Query: `limit` (default: 50) | `[{term, timestamp}]` |
| DELETE | `/api/history` | Clear user's search history | - | `{message}` |

### Example API Calls

#### Search for Images

```bash
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{"term": "nature"}' \
  --cookie "connect.sid=your_session_cookie"
```

#### Get Top Searches

```bash
curl http://localhost:5000/api/top-searches \
  --cookie "connect.sid=your_session_cookie"
```

#### Get Search History

```bash
curl http://localhost:5000/api/history?limit=20 \
  --cookie "connect.sid=your_session_cookie"
```

## 🗄️ Database Models

### User Model

```javascript
{
  provider: String,        // 'google', 'facebook', or 'github'
  providerId: String,      // OAuth provider's user ID
  email: String,
  displayName: String,
  profilePhoto: String,
  createdAt: Date
}
```

### SearchTerm Model

```javascript
{
  userId: ObjectId,        // Reference to User
  term: String,            // Search term (lowercase, trimmed)
  timestamp: Date          // When the search was performed
}
```

## 🎨 UI Components

- **Login Page**: OAuth provider buttons with beautiful gradient design
- **Header**: User info, profile photo, and logout button
- **Top Searches Banner**: Horizontal scrollable list of top 5 searches
- **Search Bar**: Input field with search button
- **Image Grid**: Responsive 4-column grid (3 on tablet, 2 on mobile, 1 on small mobile)
- **Image Cards**: Hover overlay with checkbox and image info
- **Selection Counter**: Dynamic counter showing selected images
- **Search History**: List of user's past searches with timestamps

## 🔒 Security Features

- Session-based authentication with MongoDB session store
- HTTP-only cookies for session management
- CORS configuration for frontend-backend communication
- Environment variables for sensitive credentials
- OAuth 2.0 for secure third-party authentication
- Unique compound indexes to prevent duplicate OAuth users

## 🌐 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/dbname` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `CLIENT_URL` | Frontend URL | `http://localhost:3000` |
| `SESSION_SECRET` | Session encryption key | Random string (use crypto.randomBytes) |
| `UNSPLASH_ACCESS_KEY` | Unsplash API key | From Unsplash Developers |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret | From Google Cloud Console |
| `FACEBOOK_APP_ID` | Facebook App ID | From Facebook Developers |
| `FACEBOOK_APP_SECRET` | Facebook App Secret | From Facebook Developers |
| `GITHUB_CLIENT_ID` | GitHub OAuth Client ID | From GitHub Settings |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Secret | From GitHub Settings |

## 📱 Features Overview

### Authentication Flow
1. User clicks OAuth provider button on login page
2. Redirected to provider's consent page
3. After approval, redirected back to app
4. User data stored in MongoDB (or retrieved if exists)
5. Session created and user redirected to dashboard

### Search Flow
1. User enters search term
2. Term saved to database with userId and timestamp
3. Unsplash API called with search term
4. Results displayed in 4-column grid
5. Top searches and history updated

### Multi-Select Flow
1. User hovers over image to see checkbox
2. Click image or checkbox to toggle selection
3. Selection counter updates dynamically
4. Selected images highlighted with colored border

## 🧪 Testing the Application

1. **Test OAuth Login**:
   - Try logging in with Google, Facebook, and GitHub
   - Verify user data is stored in MongoDB

2. **Test Search**:
   - Search for various terms (e.g., "nature", "technology", "food")
   - Verify results are displayed correctly
   - Check that search is saved to history

3. **Test Multi-Select**:
   - Select multiple images
   - Verify counter updates
   - Check visual feedback (border color)

4. **Test Top Searches**:
   - Perform multiple searches
   - Verify top searches banner shows correct data
   - Click on a top search to perform that search

5. **Test Search History**:
   - Verify personal search history shows correctly
   - Test clicking on history items
   - Test clearing history

## 🚨 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For Atlas, whitelist your IP address

### OAuth Issues
- Verify callback URLs match in provider settings
- Check client IDs and secrets are correct
- Ensure cookies are enabled in browser

### Unsplash API Issues
- Verify API key is valid
- Check API rate limits (50 requests/hour for demo)
- Ensure proper internet connection

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Or use different port in .env
PORT=5001
```

## 📚 Technologies Used

### Frontend
- React 18
- React Router DOM 6
- Axios
- CSS3 with Flexbox & Grid

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js (OAuth strategies)
- Express Session
- Connect-Mongo (session store)
- Axios (Unsplash API calls)

### APIs & Services
- Unsplash API
- Google OAuth 2.0
- Facebook OAuth
- GitHub OAuth

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please create an issue in the GitHub repository.

---

**Built with ❤️ using the MERN Stack**
