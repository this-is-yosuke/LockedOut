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
import path from 'path';
import { fileURLToPath } from 'url';
// import { Request, Response } from 'express';


const app = express();

const __filename = fileURLToPath(import.meta.url); // LockedOut\server\dist\server.js
const __dirname = path.dirname(__filename); // LockedOut\server\dist
// const projectRoot = path.join(__dirname, "../client");

// Point to client/dist explicitly
const clientDistPath = path.resolve(__dirname, "../../client/dist");

// console.log(`This is _dirname: ${__dirname}. This is _filename: ${__filename}. This is projectRoot: ${projectRoot}.`);

// const _dirname = path.resolve();
const PORT = process.env.PORT || 3001;
// const path = require('path');

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
// app.use(express.static('../client/dist'));
// app.use(express.static(path.join(_dirname, '..', 'client', 'dist')));
// app.use(express.static(path.join(_dirname, "dist")));

// Serve static files from ../dist
// app.use(express.static(path.join(projectRoot, "dist")));

// Serve static files from client/dist
app.use(express.static(clientDistPath));

// Adding an app.use(routes) to resolve a "CANNOT GET/" error on Render
app.use(routes);

// Routes
app.use('/api/rooms', roomRouter); // Add room routes
app.use('/api/riddles', riddleRouter); // Add riddle routes
app.use('/api', routes); // Add other routes (this is for your general API routes)
app.use('/auth', Router);
app.use('/api/users', userRouter);  // Ensure this line is present!
app.use('/api/attempt', attemptRouter); // Ensure the correct route mapping

// Catch-all handler to return React app for non-API routes
// app.get('*', (_req: Request, res: Response) => {
//   res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
// });
// app.get("*", (_, res) => {
//   res.sendFile(path.join(_dirname, "dist", "index.html"));
// });

// SPA fallback
// app.get("*", (_, res) => {
//   res.sendFile(path.join(projectRoot, "dist", "index.html"));
// });

// 2nd SPA fallback
app.get("*", (_, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

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