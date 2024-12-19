import sequelize from '../config/connection.js';
// import { AttemptFactory } from './attempt.js';
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
 
 TWO USER TYPES??????
 user & creator
 leave user as-is, but have creator's PK be a FK pointing to userID. The creator table ought to have:
 - PK: id (fk pointing to userID)
 - created_room pointing to the roomID of their creation
 - Afterall, all creators are users, but not all users are creators
 - Or can I have TWO types of relations between User and Room [1-to-many, many-to-many]???
 - GET rooms shows the room's creator as NULL (the seeds have a valid userID for the creator field)
 - GET users shows their created rooms as an empty array (the user seeds don't specify rooms)
 - According to ChatGPT, I needed to specify the foreign key here
*/

// The 1 User - to - many Rooms association
// User.hasMany(Room, {
//     onDelete: 'CASCADE',
//     as: 'rooms',
// })

// Room.belongsTo(User);

// The many Users - to - many Rooms association
User.belongsToMany(Room, {
    through: 'Attempt',
});

Room.belongsToMany(User, {
    through: 'Attempt',
});

// A single room has many riddles
Room.hasMany(Riddle, {
    onDelete: 'CASCADE',
    as: 'riddles',
})

// A riddle is in one room
Riddle.belongsTo(Room);

export { Riddle, Room, User };
