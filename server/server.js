const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

// Import passport configuration (only if OAuth is configured)
try {
  require('./config/passport');
} catch (err) {
  console.log('⚠️ Passport configuration skipped (OAuth not configured)');
}

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// MongoDB Connection (Optional for demo)
const isMongoConfigured = process.env.MONGODB_URI && 
                          !process.env.MONGODB_URI.includes('your_') && 
                          !process.env.MONGODB_URI.includes('your-') &&
                          !process.env.MONGODB_URI.includes('mongodb://localhost:27017');

if (isMongoConfigured) {
  // Only attempt connection if properly configured
  mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
  })
  .catch(err => {
    console.error('⚠️ MongoDB Connection Error:', err.message);
    console.log('💡 Running in DEMO MODE - Limited functionality');
  });
} else {
  console.log('⚠️ MongoDB not configured - running in DEMO MODE');
  console.log('💡 OAuth and search history features require MongoDB setup');
  console.log('📖 See DEMO_MODE_INSTRUCTIONS.md for setup guide');
}

// Session Configuration (without MongoStore in demo mode)
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'demo-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
};

// Only add MongoStore if MongoDB is properly configured
// This prevents any connection attempts to MongoDB
if (isMongoConfigured) {
  try {
    sessionConfig.store = MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      touchAfter: 24 * 3600
    });
    console.log('📦 Using MongoDB session store');
  } catch (err) {
    console.log('⚠️ MongoStore creation failed, using memory store');
  }
} else {
  console.log('📦 Using memory session store (sessions will not persist)');
}

app.use(session(sessionConfig));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Health check route for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Root health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'MERN Image Search API',
    status: 'running',
    endpoints: {
      auth: '/auth/*',
      api: '/api/*'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
