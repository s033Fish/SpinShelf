// src/models/Album.ts (or Vinyl.ts)
export interface Album {
  id?: string;
  title: string;
  artist: string;
  genre: string;
  releaseYear: number;
  coverImage: string;
}
