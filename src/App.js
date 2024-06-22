// @flow
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PhotoGallery from './components/PhotoGallery';
import PhotoDetails from './components/PhotoDetails';
import './App.css';
import { photos } from './data/photos';

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

const App = ({ initialPhotos }: Props) => {
  const randomPhotoId = initialPhotos[Math.floor(Math.random() * initialPhotos.length)].id;

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Photo Gallery App</h1>
        </header>
        <Routes>
          <Route path="/" element={<Navigate to={`/photo/${randomPhotoId}`} />} />
          <Route path="/photo/:id" element={<PhotoGallery initialPhotos={initialPhotos} />} />
          <Route path="/photo/:id/details" element={<PhotoDetails photos={initialPhotos} />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
