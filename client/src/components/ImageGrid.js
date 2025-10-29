import React from 'react';
import './ImageGrid.css';

function ImageGrid({ images, selectedImages, onImageSelect }) {
  if (!images || images.length === 0) {
    return (
      <div className="no-results">
        <p>No images found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="image-grid">
      {images.map((image) => (
        <div 
          key={image.id} 
          className={`image-card ${selectedImages.includes(image.id) ? 'selected' : ''}`}
          onClick={() => onImageSelect(image.id)}
        >
          <img 
            src={image.urls.small} 
            alt={image.description || 'Unsplash image'} 
            loading="lazy"
          />
          
          <div className="image-overlay">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={selectedImages.includes(image.id)}
                onChange={() => {}}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            <div className="image-info">
              <p className="image-description">
                {image.description || 'Untitled'}
              </p>
              <p className="image-author">
                Photo by {image.user.name}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;
