// src/index.ts
import 'reflect-metadata';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import * as admin from 'firebase-admin';
import { vinylResolvers } from './resolvers/VinylResolver';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = require('../firebaseServiceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<your-project-id>.firebaseio.com',
});

const db = admin.firestore();

// GraphQL Schema Definition
const schema = buildSchema(`
  type Vinyl {
    id: String
    title: String
    artist: String
    genre: String
    releaseYear: Int
    coverImage: String
  }

  type Query {
    vinyls: [Vinyl]
  }

  type Mutation {
    addVinyl(title: String!, artist: String!, genre: String!, releaseYear: Int!, coverImage: String!): Vinyl
  }
`);

// GraphQL Resolvers
const resolvers = {
  Query: {
    vinyls: async () => {
      const snapshot = await db.collection('vinyls').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
  },
  Mutation: {
    addVinyl: async (_: any, args: any) => {
      const newVinyl = {
        title: args.title,
        artist: args.artist,
        genre: args.genre,
        releaseYear: args.releaseYear,
        coverImage: args.coverImage,
      };
      const docRef = await db.collection('vinyls').add(newVinyl);
      return { id: docRef.id, ...newVinyl };
    },
  },
};

// Create Express Application
const app = express();

// Apply GraphQL Middleware
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true, // Enable GraphiQL Interface
  }),
);

// Start the Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
