// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import path from 'path';
import albumRoutes from './routes/albumRoutes';

dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = require('../firebaseServiceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<your-project-id>.firebaseio.com',
});

// Create Express Application
const app = express();

app.use(express.json());

// Serve Static Files from Public Directory
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

// API Routes
app.use('/api', albumRoutes);

// Homepage Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

// Start the Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
