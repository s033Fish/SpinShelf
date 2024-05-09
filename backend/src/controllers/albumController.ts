// src/controllers/albumController.ts
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { Album } from '../models/Album';

const db = admin.firestore();
const albumCollection = db.collection('albums');

export const getAlbums = async (req: Request, res: Response) => {
  try {
    const snapshot = await albumCollection.get();
    const albums: Album[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Album[];
    res.status(200).json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ error: 'Failed to fetch albums' });
  }
};

export const addAlbum = async (req: Request, res: Response) => {
  try {
    const newAlbum: Album = {
      title: req.body.title,
      artist: req.body.artist,
      genre: req.body.genre,
      releaseYear: req.body.releaseYear,
      coverImage: req.body.coverImage,
    };
    const docRef = await albumCollection.add(newAlbum);
    res.status(201).json({ id: docRef.id, ...newAlbum });
  } catch (error) {
    console.error('Error adding album:', error);
    res.status(500).json({ error: 'Failed to add album' });
  }
};
