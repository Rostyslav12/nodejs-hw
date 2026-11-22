import { errors } from 'celebrate';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';

import errorHandler from './middleware/errorHandler.js';
import logger from './middleware/logger.js';
import notFoundHandler from './middleware/notFoundHandler.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use(notesRoutes);

// Celebrate validation errors
app.use(errors());

// 404 handler
app.use(notFoundHandler);

// General error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error.message);
    process.exit(1);
  }
};

startServer();
