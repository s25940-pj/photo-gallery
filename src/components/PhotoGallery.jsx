import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { photos } from '../data/photos';
import PropTypes from 'prop-types';

const PhotoGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photoIndex, setPhotoIndex] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const index = photos.findIndex(photo => photo.id === parseInt(id));
    if (index !== -1) {
      setPhotoIndex(index);
      setPhoto(photos[index]);
      setRating(photos[index].rating);
    }
  }, [id]);

  const handleRatingChange = newRating => {
    if (photoIndex !== null) {
      const updatedPhotos = [...photos];
      updatedPhotos[photoIndex].rating = newRating;
      setRating(newRating);
    }
  };

  return (
    <div>
      <h1>Photo Gallery</h1>
      {photo ? (
        <div>
          <img
            src={photo.link}
            alt={`${photo.author}`}
            style={{ width: '100%', maxHeight: '500px' }}
          />
          <div>
            <ReactStars
              count={5}
              value={rating}
              onChange={handleRatingChange}
              size={24}
              activeColor="#ffd700"
            />
            <p>Average Rating: {rating.toFixed(1)}</p>
            <Link to={`/photo/${photo.id}/details`}>View Details</Link>
          </div>
          <div>
            {photoIndex > 0 && (
              <button
                onClick={() => navigate(`/photo/${photos[photoIndex - 1].id}`)}
              >
                {'<'}
              </button>
            )}
            {photoIndex < photos.length - 1 && (
              <button
                onClick={() => navigate(`/photo/${photos[photoIndex + 1].id}`)}
              >
                {'>'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Photo not found</p>
      )}
    </div>
  );
};

PhotoGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PhotoGallery;
