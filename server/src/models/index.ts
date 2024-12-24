import sequelize from '../config/connection.js';
import { RiddleFactory } from './riddle.js';
import { RoomFactory } from './room.js';
import { UserFactory } from './user.js';

// const Attempt = AttemptFactory(sequelize);
const Riddle = RiddleFactory(sequelize);
const Room = RoomFactory(sequelize);
const User = UserFactory(sequelize);

// Association between models

/* As a user, you can complete as many rooms as you want; a room can be completed by many users.
   HOWEVER, we want a user to complete many rooms AND a room to be completed by many users [many-many],
   SUCH THAT when I query USERS, comepleted room IDs show up. When I query ROOMS, I can see all
   USERS who completed it. How about this:
 - Query USERS shows rooms they completed
 - Query ROOMS shows the users who completed it
   -> many-to-many
 - Query USERS shows the rooms they created
 - Query ROOMS shows its creator
   -> one-to-many
 */

User.hasMany(Room, {
    onDelete: 'CASCADE',
    as: 'roomsCreated/Creator',
    //foreignKey: 'id',
    foreignKey: 'userId',
});


Room.belongsTo(User, {as: 'roomsCreated/Creator', foreignKey: 'userId'});

// The many Users - to - many Rooms association
User.belongsToMany(Room, {
    through: 'Attempt',
});

Room.belongsToMany(User, {
    through: 'Attempt',
});

// In User model
User.hasMany(Room, {
    foreignKey: 'creatorID', // Make sure the foreign key in Room is 'creatorID'
    as: 'roomsCreated', // Alias for the rooms created by this user
});

// In Room model
Room.belongsTo(User, {
    foreignKey: 'creatorID',
    as: 'Creator', // Alias for the creator (user who created the room)
});

// A single room has many riddles
Room.hasMany(Riddle, {
    onDelete: 'CASCADE',
    as: 'riddles',
});

// A riddle is in one room
Riddle.belongsTo(Room);

export { Riddle, Room, User, sequelize }; 