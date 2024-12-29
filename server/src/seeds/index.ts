import sequelize from "../config/connection.js";
import { seedDatabase } from './seed.js';

const seedAll = async (): Promise<void> => {
    try {
        await sequelize.sync({ force: true });
        console.log(`\n DATABASE SYNCED \n`);

        // Dynamically fetch and drop existing constraints
        await sequelize.query(`
            DO $$
            DECLARE
                con_name text;
            BEGIN
                FOR con_name IN
                    SELECT conname
                    FROM pg_constraint
                    WHERE conrelid = 'attempt'::regclass
                    AND conname LIKE 'unique_%'
                LOOP
                    EXECUTE format('ALTER TABLE attempt DROP CONSTRAINT %I;', con_name);
                END LOOP;
            END $$;
        `);

        // Log columns in the 'attempt' table for debugging
        const [results] = await sequelize.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'attempt';
        `);
        console.log('Columns:', results);

        // Seed the database
        await seedDatabase();
        console.log(`\n Users seeded \n`);

        process.exit(0);
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
};

seedAll();