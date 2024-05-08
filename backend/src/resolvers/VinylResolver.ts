// src/resolvers/VinylResolver.ts
import * as admin from 'firebase-admin';
import { Vinyl } from '../models/Vinyl';

// Initialize Firestore Database
const db = admin.firestore();

// Define the resolvers
export const vinylResolvers = {
  Query: {
    vinyls: async (): Promise<Vinyl[]> => {
      const snapshot = await db.collection('vinyls').get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Vinyl[];
    },
  },
  Mutation: {
    addVinyl: async (_: any, args: any): Promise<Vinyl> => {
      const newVinyl = {
        title: args.title,
        artist: args.artist,
        genre: args.genre,
        releaseYear: args.releaseYear,
        coverImage: args.coverImage,
      };
      const docRef = await db.collection('vinyls').add(newVinyl);
      return { id: docRef.id, ...newVinyl } as Vinyl;
    },
  },
};
