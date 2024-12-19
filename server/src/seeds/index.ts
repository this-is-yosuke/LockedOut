import sequelize from "../config/connection.js";
import { seedDatabase } from './seed.js';
// import {seedAttempts} from './attempt-seeds'; Being an intermediary table, sequelize makes the table for us

const seedAll = async (): Promise<void> => {
    try{
        await sequelize.sync({force: true});
        console.log(`\n DATABASE SYNCED \n`);

        await seedDatabase();
        console.log(`\n Users seeded \n`);

        process.exit(0);
    }catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedAll();