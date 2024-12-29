import sequelize from "../config/connection.js";
import { seedDatabase } from './seed.js';
import { QueryTypes } from 'sequelize';

const seedAll = async () => {
    console.log('Running seed script...');

    try {
        await sequelize.sync({ force: true });
        console.log('Database synced.');

        // Inspect constraints
        const constraints = await sequelize.query(
            `
            SELECT conname, pg_get_constraintdef(oid) AS definition
            FROM pg_constraint
            WHERE conrelid = 'attempt'::regclass;
            `,
            { type: QueryTypes.SELECT } // Directly use the imported QueryTypes
        );

        console.log('Existing Constraints on "attempt" table:', constraints);

        // Continue with seeding logic...
        console.log('Seeding database...');
        await seedDatabase();
        console.log('Database seeded.');

        process.exit(0);
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
};

seedAll();