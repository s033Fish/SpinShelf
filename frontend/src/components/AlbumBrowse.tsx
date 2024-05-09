// src/components/AlbumBrowse.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AlbumBrowse.css';

interface Album {
  id: string;
  title: string;
  artist: string;
  genre: string;
  releaseYear: number;
  coverImage: string;
}

const AlbumBrowse: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/browse');
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="album-browse">
      <h2>Browse Albums</h2>
      <input
        type="text"
        placeholder="Search albums..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <ul>
        {filteredAlbums.map((album) => (
          <li key={album.id} className="album">
            <img src={album.coverImage} alt={`${album.title} Cover`} className="album-cover" />
            <div className="album-info">
              <h3>{album.title}</h3>
              <p>Artist: {album.artist}</p>
              <p>Genre: {album.genre}</p>
              <p>Release Year: {album.releaseYear}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumBrowse;
