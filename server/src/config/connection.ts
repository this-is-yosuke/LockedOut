
import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { URL } from 'url';  // Required to parse the connection URL

// Parse the DATABASE_URL
const dbUrl = new URL(process.env.DATABASE_URL!);  // Ensure DATABASE_URL is set in .env

// Create a new Sequelize instance using the parsed URL with SSL enabled
const sequelize = new Sequelize(dbUrl.href, {
    dialect: 'postgres',
    dialectOptions: {
      // ssl: {
      //   require: false,  // Ensure SSL is required
      //   rejectUnauthorized: false,  // Set to false for self-signed certificates
      // },
    },
    logging: console.log, // Enable Sequelize logging to console
  });

export default sequelize;

