import sequelize from "../config/connection.js";
import { seedDatabase } from './seed.js';
// import {seedAttempts} from './attempt-seeds'; Being an intermediary table, sequelize makes the table for us

const seedAll = async (): Promise<void> => {
    try {
        await sequelize.sync({ force: true });
        console.log(`\n DATABASE SYNCED \n`);

        await sequelize.query("ALTER TABLE attempt DROP CONSTRAINT IF EXISTS unique_user_room;");
        await sequelize.query("ALTER TABLE attempt DROP CONSTRAINT IF EXISTS attempt_userId_key;");
        await sequelize.query("ALTER TABLE attempt DROP CONSTRAINT IF EXISTS attempt_roomId_key;");
        
        // Use the correct query to get columns from the 'attempt' table in PostgreSQL
        const results = await sequelize.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'attempt';
        `);
        console.log('Columns:', results);

        await seedDatabase();
        console.log(`\n Users seeded \n`);

        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedAll();