import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { photos } from '../data/photos';

const PhotoDetails = () => {
  const { id } = useParams();
  const photo = photos.find((photo) => photo.id === parseInt(id));

  if (!photo) {
    return <p>Photo not found</p>;
  }

  return (
    <div>
      <h1>Photo Details</h1>
      <img src={photo.link} alt={`Photo by ${photo.author}`} style={{ width: '100%', maxHeight: '500px' }} />
      <p><strong>Author:</strong> {photo.author}</p>
      <p><strong>Date:</strong> {photo.date}</p>
      <p><strong>Details:</strong> {photo.details}</p>
      <p><strong>Average Rating:</strong> {photo.rating.toFixed(1)}</p>
      <Link to={`/photo/${photo.id}`}>Back to Photo</Link>
    </div>
  );
};

export default PhotoDetails;
