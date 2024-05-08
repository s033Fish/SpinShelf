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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const admin = __importStar(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize Firebase Admin SDK
const serviceAccount = require('../firebaseServiceAccount.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://<your-project-id>.firebaseio.com',
});
const db = admin.firestore();
// GraphQL Schema Definition
const schema = (0, graphql_1.buildSchema)(`
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
        addVinyl: async (_, args) => {
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
const app = (0, express_1.default)();
// Apply GraphQL Middleware
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema,
    rootValue: resolvers,
    graphiql: true, // Enable GraphiQL Interface
}));
// Start the Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
});
