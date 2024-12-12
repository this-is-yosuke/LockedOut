import { Riddle } from '../models/riddle.js';

// Riddles have: name, description, answer, order, roomID (rooms were: crypt, space, IKEA)

export const seedRiddles = async () => {
    await Riddle.bulkCreate([
        {name: 'Spoop', content: 'I do not have eyes, but once I did see. I had thoughts, but now I am empty. What am I?', answer: 'Skull', position: 1, roomID: 1},
        {name: 'Aliens', content: 'Why did the alien couple break up?', answer: 'They needed space', position: 1, roomID: 2},
        {name: 'Furniture', content: 'I have four legs, but I never walk. I have aback, but I cannot talk. What am I?', answer: 'Chair', position: 1, roomID: 3},
    ], {individualHooks: true});
}