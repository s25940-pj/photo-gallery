import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import PhotoGallery from './components/PhotoGallery';
import PhotoDetails from './components/PhotoDetails';
import './App.css';
import { photos } from './data/photos';
import PropTypes from 'prop-types';

const App = () => {
  const randomPhotoId = photos[Math.floor(Math.random() * photos.length)].id;

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/photo/${randomPhotoId}`} />}
          />
          <Route path="/photo/:id" element={<PhotoGallery />} />
          <Route path="/photo/:id/details" element={<PhotoDetails />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

App.propTypes = {
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

export default App;
