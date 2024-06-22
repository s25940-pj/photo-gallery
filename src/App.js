import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PhotoGallery from './components/PhotoGallery';
import PhotoDetails from './components/PhotoDetails';
import './App.css';
import { photos } from './data/photos';

const App = () => {
  const randomPhotoId = photos[Math.floor(Math.random() * photos.length)].id;

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to={`/photo/${randomPhotoId}`} />} />
          <Route path="/photo/:id" element={<PhotoGallery />} />
          <Route path="/photo/:id/details" element={<PhotoDetails />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
