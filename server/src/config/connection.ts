
import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { URL } from 'url';  // Required to parse the connection URL

// Parse the DATABASE_URL
const dbUrl = new URL(process.env.DATABASE_URL!);  // Ensure DATABASE_URL is set in .env

// Create a new Sequelize instance using the parsed URL
const sequelize = new Sequelize(dbUrl.href, {
  dialect: 'postgres',
  logging: false, // Disable Sequelize logging
  define: {
    // Optional: Enable timestamps (createdAt, updatedAt) on models
    timestamps: true,
  },
});

export default sequelize;