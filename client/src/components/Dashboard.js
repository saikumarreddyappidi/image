import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import TopSearches from './TopSearches';
import SearchBar from './SearchBar';
import ImageGrid from './ImageGrid';
import SearchHistory from './SearchHistory';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const [topSearches, setTopSearches] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopSearches();
    fetchSearchHistory();
  }, []);

  const fetchTopSearches = async () => {
    try {
      const response = await axios.get('/api/top-searches');
      setTopSearches(response.data);
    } catch (error) {
      console.error('Error fetching top searches:', error);
    }
  };

  const fetchSearchHistory = async () => {
    try {
      const response = await axios.get('/api/history');
      setSearchHistory(response.data);
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
  };

  const handleSearch = async (term) => {
    if (!term.trim()) return;

    setLoading(true);
    setError(null);
    setSelectedImages([]);

    try {
      // Fetch first 3 pages to get 90 photos (30 per page)
      const promises = [
        axios.post('/api/search', { term, page: 1, perPage: 30 }),
        axios.post('/api/search', { term, page: 2, perPage: 30 }),
        axios.post('/api/search', { term, page: 3, perPage: 30 })
      ];

      const responses = await Promise.all(promises);
      
      // Combine all results
      const allResults = responses.flatMap(r => r.data.results);
      
      setSearchResults({
        searchTerm: responses[0].data.searchTerm,
        total: responses[0].data.total,
        totalPages: responses[0].data.totalPages,
        results: allResults
      });
      
      // Refresh top searches and history
      fetchTopSearches();
      fetchSearchHistory();
    } catch (error) {
      console.error('Search error:', error);
      setError(error.response?.data?.error || 'Failed to perform search');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (imageId) => {
    setSelectedImages(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      } else {
        return [...prev, imageId];
      }
    });
  };

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear your search history?')) {
      try {
        await axios.delete('/api/history');
        setSearchHistory([]);
        fetchTopSearches(); // Update top searches after clearing
      } catch (error) {
        console.error('Error clearing history:', error);
      }
    }
  };

  const handleDownloadSelected = async () => {
    if (selectedImages.length === 0) {
      alert('Please select at least one image to download');
      return;
    }

    // Get selected image objects
    const imagesToDownload = searchResults.results.filter(img => 
      selectedImages.includes(img.id)
    );

    alert(`Starting download of ${selectedImages.length} image${selectedImages.length !== 1 ? 's' : ''}...`);

    // Download each selected image to your computer
    for (let i = 0; i < imagesToDownload.length; i++) {
      const image = imagesToDownload[i];
      
      try {
        // Fetch the image as a blob
        const response = await fetch(image.urls.regular);
        const blob = await response.blob();
        
        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${image.description || 'unsplash'}-${image.id}.jpg`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        // Small delay between downloads
        if (i < imagesToDownload.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 800));
        }
      } catch (error) {
        console.error(`Error downloading image ${image.id}:`, error);
      }
    }
  };

  return (
    <div className="dashboard">
      <Header user={user} onLogout={onLogout} />
      
      <div className="dashboard-content">
        <TopSearches searches={topSearches} onSearchClick={handleSearch} />
        
        <div className="main-section">
          <SearchBar onSearch={handleSearch} loading={loading} />
          
          {error && (
            <div className="error-message">
              <p>❌ {error}</p>
            </div>
          )}
          
          {loading && (
            <div className="loading-section">
              <div className="spinner"></div>
              <p>Searching images...</p>
            </div>
          )}
          
          {searchResults && !loading && (
            <>
              <div className="search-info">
                <h2>You searched for "{searchResults.searchTerm}" — {searchResults.total} results</h2>
                {selectedImages.length > 0 && (
                  <div className="selection-counter">
                    Selected {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''}
                    <button 
                      className="download-btn"
                      onClick={handleDownloadSelected}
                      title="Download selected images"
                    >
                      📥 Download {selectedImages.length} Image{selectedImages.length !== 1 ? 's' : ''}
                    </button>
                  </div>
                )}
              </div>
              
              <ImageGrid 
                images={searchResults.results}
                selectedImages={selectedImages}
                onImageSelect={handleImageSelect}
              />
            </>
          )}
          
          {!searchResults && !loading && (
            <div className="welcome-section">
              <div className="welcome-icon">🔍</div>
              <h2>Welcome, {user.displayName}!</h2>
              <p>Start searching for beautiful images from Unsplash</p>
            </div>
          )}
        </div>
        
        <SearchHistory 
          history={searchHistory}
          onSearchClick={handleSearch}
          onClearHistory={handleClearHistory}
        />
      </div>
    </div>
  );
}

export default Dashboard;
