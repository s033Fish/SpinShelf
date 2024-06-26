"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const admin = __importStar(require("firebase-admin"));
const path_1 = __importDefault(require("path"));
const albumRoutes_1 = __importDefault(require("./routes/albumRoutes"));
dotenv_1.default.config();
// Initialize Firebase Admin SDK
const serviceAccount = require('../firebaseServiceAccount.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://<your-project-id>.firebaseio.com',
});
// Create Express Application
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Serve Static Files from Public Directory
app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'public')));
// API Routes
app.use('/api', albumRoutes_1.default);
// Homepage Route
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', '..', 'public', 'index.html'));
});
// Start the Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
