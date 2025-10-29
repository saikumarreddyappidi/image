const express = require('express');
const passport = require('passport');
const router = express.Router();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Helper function to check if OAuth provider is configured
const isProviderConfigured = (provider) => {
  const configs = {
    google: process.env.GOOGLE_CLIENT_ID && !process.env.GOOGLE_CLIENT_ID.includes('your'),
    linkedin: process.env.LINKEDIN_CLIENT_ID && !process.env.LINKEDIN_CLIENT_ID.includes('your'),
    github: process.env.GITHUB_CLIENT_ID && !process.env.GITHUB_CLIENT_ID.includes('your')
  };
  return configs[provider] || false;
};

// Google OAuth Routes
router.get('/google', (req, res, next) => {
  if (!isProviderConfigured('google')) {
    return res.status(503).json({ 
      error: 'Google OAuth is not configured',
      message: 'Please configure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your .env file'
    });
  }
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  if (!isProviderConfigured('google')) {
    return res.redirect(`${CLIENT_URL}/login?error=oauth_not_configured`);
  }
  passport.authenticate('google', { failureRedirect: `${CLIENT_URL}/login` })(req, res, next);
}, (req, res) => {
  res.redirect(`${CLIENT_URL}/dashboard`);
});

// LinkedIn OAuth Routes
router.get('/linkedin', (req, res, next) => {
  if (!isProviderConfigured('linkedin')) {
    return res.status(503).json({ 
      error: 'LinkedIn OAuth is not configured',
      message: 'Please configure LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET in your .env file'
    });
  }
  passport.authenticate('linkedin')(req, res, next);
});

router.get('/linkedin/callback', (req, res, next) => {
  if (!isProviderConfigured('linkedin')) {
    return res.redirect(`${CLIENT_URL}/login?error=oauth_not_configured`);
  }
  passport.authenticate('linkedin', { failureRedirect: `${CLIENT_URL}/login` })(req, res, next);
}, (req, res) => {
  res.redirect(`${CLIENT_URL}/dashboard`);
});

// GitHub OAuth Routes
router.get('/github', (req, res, next) => {
  if (!isProviderConfigured('github')) {
    return res.status(503).json({ 
      error: 'GitHub OAuth is not configured',
      message: 'Please configure GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in your .env file'
    });
  }
  passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
});

router.get('/github/callback', (req, res, next) => {
  if (!isProviderConfigured('github')) {
    return res.redirect(`${CLIENT_URL}/login?error=oauth_not_configured`);
  }
  passport.authenticate('github', { failureRedirect: `${CLIENT_URL}/login` })(req, res, next);
}, (req, res) => {
  res.redirect(`${CLIENT_URL}/dashboard`);
});

// Get current user
router.get('/current-user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      user: {
        id: req.user._id,
        displayName: req.user.displayName,
        email: req.user.email,
        profilePhoto: req.user.profilePhoto,
        provider: req.user.provider
      }
    });
  } else {
    res.json({ authenticated: false });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
