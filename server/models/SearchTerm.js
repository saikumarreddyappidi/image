const mongoose = require('mongoose');

const searchTermSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  term: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Index for finding user's search history
searchTermSchema.index({ userId: 1, timestamp: -1 });

// Index for aggregating top searches
searchTermSchema.index({ term: 1 });

module.exports = mongoose.model('SearchTerm', searchTermSchema);
