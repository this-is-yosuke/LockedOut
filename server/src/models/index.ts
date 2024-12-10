import sequelize from '../config/connection.js';
import { AttemptFactory } from './attempt.js';
import { RiddleFactory } from './riddle.js';
import { RoomFactory } from './room.js';
import { UserFactory } from './user.js';

const Attempt = AttemptFactory(sequelize);
const Riddle = RiddleFactory(sequelize);
const Room = RoomFactory(sequelize);
const User = UserFactory(sequelize);

// Association between models

// As a user, you can complete as many rooms as you want; a room can be completed by many users
Room.belongsToMany(User, {
    through: 'Attempt',
});

User.belongsToMany(Room, {
    through: 'Attempt',
});

// A single room has many riddles
Room.hasMany(Riddle, {
    onDelete: 'CASCADE',
    as: 'riddles',
})

// A riddle is in one room
Riddle.belongsTo(Room);

export { Attempt, Riddle, Room, User };
