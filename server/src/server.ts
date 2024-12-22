import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import { roomRouter } from './routes/api/roomRoutes.js'; // Import the room routes
import { userRouter } from './routes/api/userRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

const forceDatabaseRefresh = false;

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:5173',  // Allow frontend to make requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
};

// Use CORS middleware globally
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the client
app.use(express.static('../client/dist'));

// Routes
app.use('/api/room', roomRouter); // Add room routes
app.use('/api', routes); // Add other routes (this is for your general API routes)
app.use('/api/users', userRouter);  // Ensure this line is present!


// Sync database and start the server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});