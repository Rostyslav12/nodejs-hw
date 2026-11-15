import dns from 'node:dns';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import pinoHttp from 'pino-http';

import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';

import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

dns.setServers(['192.168.0.1']);
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(pinoHttp());
app.use(express.json());
app.use(cors());

// Routes
app.use('/notes', notesRoutes);

// Middleware for handling unknown routes
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

// Start server
const startServer = async () => {
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
