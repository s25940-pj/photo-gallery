// @flow
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { photos } from '../data/photos';

type Photo = {
  id: number,
  link: string,
  rating: number,
  author: string,
  date: string,
  details: string
};

type Props = {
  initialPhotos: Array<Photo>
};

const PhotoGallery = ({ initialPhotos }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photoIndex, setPhotoIndex] = useState<?number>(null);
  const [photo, setPhoto] = useState<?Photo>(null);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const index = initialPhotos.findIndex(photo => photo.id === parseInt(id, 10));
    if (index !== -1) {
      setPhotoIndex(index);
      setPhoto(initialPhotos[index]);
      setRating(initialPhotos[index].rating);
    }
  }, [id, initialPhotos]);

  const handleRatingChange = (newRating: number) => {
    if (photoIndex !== null) {
      initialPhotos[photoIndex].rating = newRating;
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
            alt={`Photo by ${photo.author}`}
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
                type="button"
                onClick={() => navigate(`/photo/${initialPhotos[photoIndex - 1].id}`)}
              >
                {'<'}
              </button>
            )}
            {photoIndex < initialPhotos.length - 1 && (
              <button
                type="button"
                onClick={() => navigate(`/photo/${initialPhotos[photoIndex + 1].id}`)}
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

export default PhotoGallery;
