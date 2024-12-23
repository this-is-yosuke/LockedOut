import sequelize from '../config/connection.js';
import { RiddleFactory } from './riddle.js';
import { RoomFactory } from './room.js';
import { UserFactory } from './user.js';
import { AttemptFactory } from './attempt.js';

// Initialize models
const Riddle = RiddleFactory(sequelize);
const Room = RoomFactory(sequelize);
const User = UserFactory(sequelize);
const Attempt = AttemptFactory(sequelize);

// Associations
User.hasMany(Room, {
    onDelete: 'CASCADE',
    as: 'roomsCreated',
    foreignKey: 'userId', // Ensure the Room model has a userId field
});

Room.belongsTo(User, {
    as: 'creator',
    foreignKey: 'userId', // Ensure the Room model has a userId field
});

// Many-to-many relationship between User and Room through Attempt
User.belongsToMany(Room, {
    through: 'Attempt',
    foreignKey: 'userId',
});

Room.belongsToMany(User, {
    through: 'Attempt',
    foreignKey: 'roomId',
});

// One-to-many relationship between Room and Riddle
Room.hasMany(Riddle, {
    onDelete: 'CASCADE',
    as: 'riddles',
    foreignKey: 'roomId', // Ensure the Riddle model has a roomId field
});

Riddle.belongsTo(Room, {
    foreignKey: 'roomId', // Ensure the Riddle model has a roomId field
});

export { Riddle, Room, User, Attempt, sequelize };