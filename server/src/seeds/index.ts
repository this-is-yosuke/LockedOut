import { seedUsers } from './user-seeds';
import {seedAttempts} from './attempt-seeds';
import { seedRooms } from './room-seeds';
import {seedRiddles} from './riddle-seeds';
import sequelize from "../config/connection.js";

const seedAll = async (): Promise<void> => {
    try{
        await sequelize.sync({force: true});
        console.log(`\n DATABASE SYNCED \n`);

        await seedUsers();
        console.log(`\n USERS SEEDED \n`);

        await seedAttempts();
        console.log(`\n ATTEMPTS SEEDED \n`);
  
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