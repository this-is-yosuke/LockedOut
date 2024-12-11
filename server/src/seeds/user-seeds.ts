import { User } from '../models/index.js';

// Users have: id, username, email, and password

export const seedUsers = async () => {
    await User.bulkCreate([
        {username: 'Jayson', email: 'jayson@gmail.com', password: 'pass'},
        {username: 'Hook', email: 'hook@gmail.com', password: 'pass'},
        {username: 'Lt.Data', email: 'ltdata@gmail.com', password: 'pass'},
    ], {individualHooks: true} );
};