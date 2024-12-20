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

 "2 relations: 1-to-many for the room creator;
 many-to-many for rooms users completed. Can we have different
 relations between the same tables or should I create a new table
 for creator?"

Ditch the creator table and go for the 2nd relation (1-to-many)

UPDATE ROOM MODEL TO HAVE 4 FOREIGN KEYS, ONE FOR EACH RIDDLE
This has got to be a one-to-many. ONE ROOM. MANY RIDDLES. THAT RIDDLE
IS BOUND TO THAT ONE ROOM. The author is also a one-to-many...
Does the Author model have foreign keys pointing to their books?
 -Author.hasMany(Book); Book.belongsTo(Author)
 -> Room.hasMany(Riddle); Riddle.belongsTo(Room)
 * taken from models/index
The relation is as it should be.
In Insomnia, you can see "books" when you GET authors; it's just that
 each author has authored a single book. BUT! You can still see the
 book they authored on their json payload. The Author model only has
 id, name, and bio. You can still see their books when you perform GET.
 I have checked the model; it's not there. You odn't suppose I need to add another model to the GET in roomRoutes?
 DAMNIT I HAVE TO FOCUS
 I am looking into whether Riddle has to be 4 foreign keys on Room or not. The relationship between Room and Riddle
 is 1-to-many. If you look at Author in folder 20, although it has a 1-to-many with Book, Book has no foreign keys
 in the Author model. All that model has is: id, name, and bio. As such, our Room will not contain foreign keys
 linked to Riddle. But then how does the json payload show Book when you GET Author? The Author seed only has their
 name and bio. The seed file only contains Author.bulkCreate(). Seed.ts gives readers both a library card and books,
 but nothing for Author. Hmmm....
 - authorSeedData: nope
 - seed.ts: nope
 - api/authorRoutes: it specifies the Book model as 'books' in the include. However, I did that for Room and got an
   empty array. Confirmed: Every room has "riddles": []. GREAT
 - seed/index: nope
 - models/index: the syntax is identical
 - models/author: It declaresand initializes: id, name, and bio. NO FOREIGN KEY MENTIONED.
 - routes/api/index: nothing but app.use()
 - 
 WAIT! Could I be going about this backwards? I've been checking AUTHOR-related files; maybe I should look at
 ROOM-related files instead?
 BINGO! Book has AuthorID as a foreign key. Does our room have userID as a foreign key?...we do.
 GET all Users: I WANT TO SEE THEIR CREATED ROOMS

Step 1: Create room
Steps 2-5: Create a riddle and set its roomID to the new room
Step 6: GET new room to see if it has the riddles
Step 7: 

roomID=7
The POST of Riddle #1(id=7) has roomID: NULL???
Users is the users who completed the room, NOT CREATOR
The GET ALL shows Riddle, but not the GET ID?
WHY THE FUCK DOES RIDDLE HAVE ROOMID: NULL

 (Also, the riddles are an empty array [])
 --------------------------MANAGING A ONE-TO-MANY----------------------------
 - Their Author-Book is a one-to-many. Our User-Room is also a one-to-many.
 - The GET Books shows the authorID and the Author's json. GET Author shows the books they wrote.
 - Teh GET Rooms shows WAIT I KNOW
NOTE: /routes/index needs its riddleToken again
--------------------------------END OF MY RANT-------------------------------*/

// The 1 User - to - many Rooms association
User.hasMany(Room, {
    onDelete: 'CASCADE',
    as: 'roomsCreated',
    foreignKey: 'id',
});

Room.belongsTo(User, {as: 'roomsCreated', foreignKey: 'id'});

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
});

// A riddle is in one room
Riddle.belongsTo(Room);

export { Riddle, Room, User };
