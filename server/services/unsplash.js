const axios = require('axios');

const UNSPLASH_API_URL = 'https://api.unsplash.com';
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

/**
 * Search for images on Unsplash
 * @param {string} query - Search term
 * @param {number} page - Page number (default: 1)
 * @param {number} perPage - Results per page (default: 30, max: 30)
 * @returns {Promise<Object>} - Unsplash API response
 */
const searchImages = async (query, page = 1, perPage = 30) => {
  try {
    const response = await axios.get(`${UNSPLASH_API_URL}/search/photos`, {
      params: {
        query,
        page,
        per_page: Math.min(perPage, 30)  // Unsplash API max is 30
      },
      headers: {
        'Authorization': `Client-ID ${ACCESS_KEY}`
      }
    });

    return {
      total: response.data.total,
      totalPages: response.data.total_pages,
      results: response.data.results.map(photo => ({
        id: photo.id,
        description: photo.description || photo.alt_description,
        urls: {
          raw: photo.urls.raw,
          full: photo.urls.full,
          regular: photo.urls.regular,
          small: photo.urls.small,
          thumb: photo.urls.thumb
        },
        links: {
          html: photo.links.html,
          download: photo.links.download
        },
        user: {
          name: photo.user.name,
          username: photo.user.username,
          profileImage: photo.user.profile_image.small
        },
        width: photo.width,
        height: photo.height,
        color: photo.color,
        likes: photo.likes
      }))
    };
  } catch (error) {
    console.error('Unsplash API Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch images from Unsplash');
  }
};

module.exports = { searchImages };
