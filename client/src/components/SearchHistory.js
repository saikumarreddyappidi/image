import React from 'react';
import './SearchHistory.css';

function SearchHistory({ history, onSearchClick, onClearHistory }) {
  if (!history || history.length === 0) {
    return (
      <div className="search-history empty">
        <h3>📜 Your Search History</h3>
        <p className="empty-message">No searches yet. Start exploring!</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="search-history">
      <div className="history-header">
        <h3>📜 Your Search History</h3>
        <button className="clear-history-btn" onClick={onClearHistory}>
          Clear All
        </button>
      </div>
      
      <div className="history-list">
        {history.slice(0, 20).map((item, index) => (
          <div 
            key={index} 
            className="history-item"
            onClick={() => onSearchClick(item.term)}
          >
            <span className="history-term">{item.term}</span>
            <span className="history-time">{formatDate(item.timestamp)}</span>
          </div>
        ))}
      </div>
      
      {history.length > 20 && (
        <p className="history-note">Showing latest 20 searches</p>
      )}
    </div>
  );
}

export default SearchHistory;
