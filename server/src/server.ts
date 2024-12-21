const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import { roomRouter } from './routes/api/roomRoutes.js'; // Import the room routes
import cors from 'cors';



const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:5173',  // Allow frontend to make requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
};

// Use CORS middleware globally
app.use(cors(corsOptions));

app.options('/rooms', cors(corsOptions)); // Enable preflight CORS for the '/rooms' route


// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
app.use('/api/room', roomRouter);


app.use(express.json());
app.use(routes);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
  
  // Your other middleware and routes
  app.use(express.json());
  app.use('/rooms', roomRouter);
  
  // Error handling and server start logic
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3001');
  });