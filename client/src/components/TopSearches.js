import React from 'react';
import './TopSearches.css';

function TopSearches({ searches, onSearchClick }) {
  if (!searches || searches.length === 0) {
    return null;
  }

  return (
    <div className="top-searches">
      <div className="top-searches-header">
        <h3>🔥 Top Searches</h3>
        <p>Most popular searches across all users</p>
      </div>
      
      <div className="top-searches-list">
        {searches.map((search, index) => (
          <div 
            key={index} 
            className="top-search-item"
            onClick={() => onSearchClick(search.term)}
          >
            <div className="search-rank">#{index + 1}</div>
            <div className="search-details">
              <span className="search-term">{search.term}</span>
              <span className="search-count">{search.count} searches</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopSearches;
