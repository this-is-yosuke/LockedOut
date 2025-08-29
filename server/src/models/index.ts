import sequelize from '../config/connection.js';
import { RiddleFactory } from './riddle.js';
import { RoomFactory } from './room.js';
import { UserFactory } from './user.js';
import { AttemptFactory } from './attempt.js';

const Riddle = RiddleFactory(sequelize);
const Room = RoomFactory(sequelize);
const User = UserFactory(sequelize);
const Attempt = AttemptFactory(sequelize);

// Association between models

/* As a user, you can complete as many rooms as you want; a room can be completed by many users.
   HOWEVER, we want a user to complete many rooms AND a room to be completed by many users [many-many],
   SUCH THAT when I query USERS, completed room IDs show up. When I query ROOMS, I can see all
   USERS who completed it. */

//    The 1-to-many association between User(Creator) and Room
   User.hasMany(Room, {
    foreignKey: 'creatorID', // The foreign key in the Room model referring to the User model
    as: 'roomsCreated', // Alias for rooms created by the user
  });
  
  Room.belongsTo(User, { 
      foreignKey: 'creatorID', // Room creator
      as: 'Creator'
  });

//   The Many-to-many association between User(Player) and Room
  User.belongsToMany(Room, {
    through: 'Attempt', // Junction table for the many-to-many relationship
    foreignKey: 'userId',
    as: 'roomsCompleted', // Alias for rooms completed by the user
  });

Room.belongsToMany(User, {
    through: 'Attempt',
    foreignKey: 'roomId',
    as: 'Player',
});

// A single room has many riddles
Room.hasMany(Riddle, {
    onDelete: 'CASCADE', 
    as: 'riddles' 
});

Riddle.belongsTo(Room);

// User and Attempt Associations (One user can have many attempts)
User.hasMany(Attempt, {
    onDelete: 'CASCADE',
    foreignKey: 'userId'
});

Attempt.belongsTo(User, { foreignKey: 'userId' });

// Room and Attempt Associations (One room can have many attempts)
Room.hasMany(Attempt, {
    onDelete: 'CASCADE',
    foreignKey: 'roomId'
});

Attempt.belongsTo(Room, { foreignKey: 'roomId' });

export { Riddle, Room, User, Attempt, sequelize }; 