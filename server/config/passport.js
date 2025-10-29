const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      // If user was removed from DB but session still exists, return false (no user)
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    done(error);
  }
});

// Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID && !process.env.GOOGLE_CLIENT_ID.includes('your')) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ 
          provider: 'google', 
          providerId: profile.id 
        });

        if (!user) {
          // Create new user
          user = await User.create({
            provider: 'google',
            providerId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            profilePhoto: profile.photos[0]?.value
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  ));
} else {
  console.log('⚠️ Google OAuth not configured');
}

// LinkedIn OAuth Strategy
if (process.env.LINKEDIN_CLIENT_ID && !process.env.LINKEDIN_CLIENT_ID.includes('your')) {
  passport.use(new LinkedInStrategy({
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/linkedin/callback',
      scope: ['r_emailaddress', 'r_liteprofile']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ 
          provider: 'linkedin', 
          providerId: profile.id 
        });

        if (!user) {
          user = await User.create({
            provider: 'linkedin',
            providerId: profile.id,
            email: profile.emails?.[0]?.value || `${profile.id}@linkedin.com`,
            displayName: profile.displayName,
            profilePhoto: profile.photos?.[0]?.value
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  ));
} else {
  console.log('⚠️ LinkedIn OAuth not configured');
}

// GitHub OAuth Strategy
if (process.env.GITHUB_CLIENT_ID && !process.env.GITHUB_CLIENT_ID.includes('your')) {
  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
      scope: ['user:email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ 
          provider: 'github', 
          providerId: profile.id 
        });

        if (!user) {
          user = await User.create({
            provider: 'github',
            providerId: profile.id,
            email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
            displayName: profile.displayName || profile.username,
            profilePhoto: profile.photos?.[0]?.value
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  ));
} else {
  console.log('⚠️ GitHub OAuth not configured');
}

module.exports = passport;
