import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PhotoDetails from '../components/PhotoDetails';

const mockPhotos = [
  {
    id: 1,
    link: 'https://www.example.com/photo1.jpg',
    rating: 4.2,
    author: 'Mariusz Pudzianowski',
    date: '2022-01-01',
    details: 'Siła jest kobietą!',
  },
  {
    id: 2,
    link: 'https://www.example.com/photo2.jpg',
    rating: 3.8,
    author: 'Karol Wojtyła',
    date: '2022-01-02',
    details: 'Błogosławieni miłosierni, albowiem oni miłosierdzia dostąpią.',
  },
];

const mockUseParams = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockUseParams(),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('PhotoDetails', () => {
  beforeEach(() => {
    mockUseParams.mockReturnValue({ id: '1' });
  });

  it('renders photo details', () => {
    render(
      <Router>
        <PhotoDetails photos={mockPhotos} />
      </Router>
    );

    expect(screen.getByText('Photo Details')).toBeInTheDocument();
    expect(screen.getByText('Author:')).toBeInTheDocument();
    expect(screen.getByText('Date:')).toBeInTheDocument();
    expect(screen.getByText('Details:')).toBeInTheDocument();
    expect(screen.getByText('Back to Photo')).toBeInTheDocument();
  });

  it('renders "Photo not found" when photo is missing', () => {
    mockUseParams.mockReturnValue({ id: '3' });

    render(
      <Router>
        <PhotoDetails photos={mockPhotos} />
      </Router>
    );

    expect(screen.getByText('Photo not found')).toBeInTheDocument();
  });
});
