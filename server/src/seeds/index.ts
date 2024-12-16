import { seedUsers } from './user-seeds.js';
import { seedRooms } from './room-seeds.js';
import {seedRiddles} from './riddle-seeds.js';
import sequelize from "../config/connection.js";
// import {seedAttempts} from './attempt-seeds'; Being an intermediary table, sequelize makes the table for us

const seedAll = async (): Promise<void> => {
    try{
        await sequelize.sync({force: true});
        console.log(`\n DATABASE SYNCED \n`);

        await seedUsers();
        console.log(`\n USERS SEEDED \n`);

        // I'll hold onto this in case we want to customize the Attempt table
        // await seedAttempts();
        // console.log(`\n ATTEMPTS SEEDED \n`);
  
        await seedRooms();
        console.log(`\n ROOMS SEEDED \n`);

        await seedRiddles();
        console.log(`\n RIDDLES SEEDED \n`);

        process.exit(0);
    }catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedAll();