const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const SearchTerm = require('../models/SearchTerm');
const { searchImages } = require('../services/unsplash');

/**
 * GET /api/top-searches
 * Get top 5 most frequent search terms across all users
 */
router.get('/top-searches', isAuthenticated, async (req, res) => {
  try {
    const topSearches = await SearchTerm.aggregate([
      {
        $group: {
          _id: '$term',
          count: { $sum: 1 },
          lastSearched: { $max: '$timestamp' }
        }
      },
      {
        $sort: { count: -1, lastSearched: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          _id: 0,
          term: '$_id',
          count: 1,
          lastSearched: 1
        }
      }
    ]);

    res.json(topSearches);
  } catch (error) {
    console.error('Error fetching top searches:', error);
    res.status(500).json({ error: 'Failed to fetch top searches' });
  }
});

/**
 * POST /api/search
 * Search for images and save search term
 * Body: { term: string, page?: number, perPage?: number }
 */
router.post('/search', isAuthenticated, async (req, res) => {
  try {
    const { term, page = 1, perPage = 30 } = req.body;

    if (!term || term.trim() === '') {
      return res.status(400).json({ error: 'Search term is required' });
    }

    const trimmedTerm = term.trim();

    // Save search term to database
    await SearchTerm.create({
      userId: req.user._id,
      term: trimmedTerm,
      timestamp: new Date()
    });

    // Search images on Unsplash
    const results = await searchImages(trimmedTerm, page, perPage);

    res.json({
      searchTerm: trimmedTerm,
      ...results
    });
  } catch (error) {
    console.error('Error performing search:', error);
    res.status(500).json({ 
      error: 'Failed to perform search',
      message: error.message 
    });
  }
});

/**
 * GET /api/history
 * Get current user's search history
 * Query params: limit (default: 50)
 */
router.get('/history', isAuthenticated, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;

    const history = await SearchTerm.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(limit)
      .select('term timestamp -_id');

    res.json(history);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

/**
 * DELETE /api/history
 * Clear user's search history
 */
router.delete('/history', isAuthenticated, async (req, res) => {
  try {
    await SearchTerm.deleteMany({ userId: req.user._id });
    res.json({ message: 'Search history cleared successfully' });
  } catch (error) {
    console.error('Error clearing search history:', error);
    res.status(500).json({ error: 'Failed to clear search history' });
  }
});

module.exports = router;
