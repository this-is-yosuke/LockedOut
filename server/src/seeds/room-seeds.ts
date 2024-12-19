// import { Room } from '../models/room.js'
// import { User } from '../models/user.js';

// export const seedRooms = async () => {
//     const rooms =  await Room.bulkCreate([

        // Room has title, description, type, creatorID
        /* Descriptive riddles provide a few sentences of context leading up to the question. Witty questions are
           a single question, usually utilizing a bad pun. */
        /* Type = number OR letter. Type was added with the lock type in mind; some combinations use letter, while
           others use numbers. */

   //      {title: 'Ancient Crypt', description: 'Solve spooky riddles to escape this tomb.', type: 'letter', difficulty: 3, creatorID: 1},
   //      {title: 'Lost in Space', description: 'Complete these sci-fi riddles to escape the alien spacecraft!', type: 'letter', difficulty: 2, creatorID: 2},
   //      {title: 'The Endless Ikea', description: 'You suddenly find yourself in the infamous Endless Ikea. Solve the riddles and make it out alive!', type: 'letter', difficulty: 4, creatorID: 3},
   //      {title: 'Dummy1', description: 'This is a test value', type: 'number', difficulty: 4, creatorID: 3},
   //      {title: 'Dummy2', description: 'This is another test value', type: 'number', difficulty: 4, creatorID: 2},
   //      {title: 'Dummy3', description: 'This is yet another test value', type: 'number', difficulty: 4, creatorID: 1},
   //  ]);

    // generate a random room and assign it to a user
    /* This is for the MANY-TO-MANY. The user completed MANY rooms and the room was completed by MANY users!
       A user could have completed all of the rooms, sure. A user could have completed none of the rooms. Since
       this is who completed the room, creatorID on Room is still needed, since these are different fields.*/

   //  const randomRooms = rooms.slice(Math.floor(Math.random()*rooms.length));
   //  await User.addRooms(randomRooms);
// }