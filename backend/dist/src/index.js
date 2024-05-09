"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
// Create Express Application
const app = (0, express_1.default)();
// Serve Static Files from Public Directory
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
// Homepage Route
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'index.html'));
});
// Start the Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
