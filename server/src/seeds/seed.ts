import { User, Room, Riddle } from '../models/index.js';
import userSeedData from './userSeedData.json' with {type: 'json'};
import roomSeedData from './roomSeedData.json' with {type: 'json'};
import riddleSeedData from './riddleSeedData.json' with {type: 'json'};

export const seedDatabase = async () => {
    const users = await User.bulkCreate(userSeedData, {
        individualHooks: true,
        validate: true,
    });
    
    const rooms = await Room.bulkCreate(roomSeedData, {
        individualHooks: true,
        returning: true,
        validate: true,
    });
    
    console.log("\n Users and Rooms are seeded \n");
    
    await Riddle.bulkCreate(riddleSeedData, {
        individualHooks: true,
        returning: true,
        validate: true,
    });
    
    for(const user of users) {
        const randomRooms = rooms.slice(Math.floor(Math.random() * rooms.length));
        await user.addRooms(randomRooms);
    }
}