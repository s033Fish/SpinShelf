// src/routes/albumRoutes.ts
import { Router } from 'express';
import { getAlbums, addAlbum } from '../controllers/albumController';

const router = Router();

router.get('/albums', getAlbums);
router.post('/albums', addAlbum);

export default router;
