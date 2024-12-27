import { User, Room, Riddle, Attempt } from '../models/index.js';
import userSeedData from './userSeedData.json' with {type: 'json'};
import roomSeedData from './roomSeedData.json' with {type: 'json'};
import riddleSeedData from './riddleSeedData.json' with {type: 'json'};
import attemptSeedData from './attemptSeedData.json' with {type: 'json'};

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
    
    const attempts = await Attempt.bulkCreate(attemptSeedData, {
        individualHooks: true,
        returning: true,
        validate: false,
    });

    console.log("\n Riddles are seeded \n");
    
    for(const user of users) {
        // const randomRooms = rooms.slice(Math.floor(Math.random() * rooms.length));
        // await user.addRooms(randomRooms);
        // console.log("\n Hello??? Can anyone hear me??? \n");
        // let i = 0;
        // await user.addRoom(rooms["1"]);
        // console.log(`\n We are inside of the "user of users." Let's see what the user and room is, shall we?
        //     userName: ${user.username} & rooms[i].title: ${rooms[i].title} \n`);
        // i++;
        await user.addRoom(rooms[user.userId]);
        // for(let i = 0; i < randomRooms.length; i++){
        //     let newAttempt = attempts[i].id;
        //     await user.addAttempt(newAttempt);
        await user.addAttempt(attempts[user.userId]);
        }
    for(const room of rooms) {
        await room.addAttempt(attempts[room.id]);
    }
}