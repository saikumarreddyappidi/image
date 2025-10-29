import React from 'react';
import './Header.css';

function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1>🖼️ Image Search</h1>
        </div>
        
        <div className="header-right">
          <div className="user-info">
            {user.profilePhoto && (
              <img src={user.profilePhoto} alt={user.displayName} className="user-avatar" />
            )}
            <div className="user-details">
              <span className="user-name">{user.displayName}</span>
              <span className="user-provider">via {user.provider}</span>
            </div>
          </div>
          
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
