import { Room } from '../models/room.js'

export const seedRooms = async () => {
    await Room.bulkCreate([
        // Room has title, description, type, creatorID
        /* Descriptive riddles provide a few sentences of context leading up to the question. Witty questions are
           a single question, usually utilizing a bad pun. */
        /* Type = number OR letter. Type was added with the lock type in mind; some combinations use letter, while
           others use numbers. */
        {title: 'Ancient Crypt', description: 'Solve spooky riddles to escape this tomb.', type: 'letter', difficulty: 3, creatorID: 1},
        {title: 'Lost in Space', description: 'Complete these sci-fi riddles to escape the alien spacecraft!', type: 'letter', difficulty: 2, creatorID: 2},
        {title: 'The Endless Ikea', description: 'You suddenly find yourself in the infamous Endless Ikea. Solve the riddles and make it out alive!', type: 'letter', difficulty: 4, creatorID: 3}
    ])
}