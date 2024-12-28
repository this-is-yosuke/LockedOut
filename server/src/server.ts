import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import { roomRouter } from './routes/api/roomRoutes.js'; // Import the room routes
import { userRouter } from './routes/api/userRoutes.js';
import { riddleRouter } from './routes/api/riddleRoutes.js'; // Import the riddle routes
import { attemptRouter } from './routes/api/attemptRoutes.js';
import Router from './routes/auth.routes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Conditionally set `force` based on NODE_ENV (e.g., development vs production)
const forceDatabaseRefresh = process.env.NODE_ENV === 'development';  // true in development, false in production

// Configure CORS
const corsOptions = {
  origin: 'https://lockedout.onrender.com',  // Allow frontend to make requests
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
app.use('/api/rooms', roomRouter); // Add room routes
app.use('/api/riddles', riddleRouter); // Add riddle routes
app.use('/api', routes); // Add other routes (this is for your general API routes)
app.use('/auth', Router);
app.use('/api/users', userRouter);  // Ensure this line is present!
app.use('/api/attempt', attemptRouter); // Ensure the correct route mapping

// Sync database and start the server
sequelize.sync({ force: forceDatabaseRefresh })  // Only force refresh in development
  .then(() => {
    console.log(`Database ${forceDatabaseRefresh ? 'refreshed' : 'synchronized'}`);
    // Now you can start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Example route with `req` used properly
app.get('/api/some-path', (req, res) => {
  // Now using `req` to access query parameters
  console.log(req.query.someParam);  // Example: log the query parameter
  res.send('Some Response');
});

// Example route where `req` is not needed, so we remove it
app.get('/api/rooms', (_, res) => {
  res.json({ message: 'List of rooms' });
});

// Another example with `req` used
app.post('/api/rooms', (req, res) => {
  const roomData = req.body;  // Using req.body to access posted data
  res.json({ message: 'Room created', roomData });
});