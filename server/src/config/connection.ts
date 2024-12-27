import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME!, // Type assertion to treat it as non-undefined
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!, 10), // Type assertion and parse to number
    dialect: 'postgres', // Database type
    logging: false, // Disable Sequelize logging
  }
);

export default sequelize;