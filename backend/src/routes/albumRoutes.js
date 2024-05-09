"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/albumRoutes.ts
const express_1 = require("express");
const albumController_1 = require("../controllers/albumController");
const router = (0, express_1.Router)();
router.get('/albums', albumController_1.getAlbums);
router.post('/albums', albumController_1.addAlbum);
exports.default = router;
