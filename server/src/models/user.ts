import { 
    DataTypes, type Sequelize, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes,
    BelongsToManyAddAssociationMixin 
} from 'sequelize';
import bcrypt from 'bcrypt';
import { Room } from './room'; // Import the Room model

// The `User` class extends the Sequelize model, defining attributes and associations.
export class User
    extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare password: string;

    // Add the many-to-many relationship mixins
    declare addRoom: BelongsToManyAddAssociationMixin<Room, Room['id']>;
    declare addRooms: BelongsToManyAddAssociationMixin<Room[], Room['id'][]>;

    // Method to hash the user's password before saving or updating
    async setPassword(password: string): Promise<void> {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);
    }
}

// The factory function initializes the User model with sequelize.
export function UserFactory(sequelize: Sequelize) {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // Ensure email is unique
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'user',
            hooks: {
                // Hash the password before creating or updating the user
                beforeCreate: async (user: User) => {
                    await user.setPassword(user.password);
                },
                beforeUpdate: async (user: User) => {
                    if (user.changed('password')) { // Ensure we only hash if the password is being updated
                        await user.setPassword(user.password);
                    }
                },
            },
        }
    );

    return User;
}

// Associations between User and Room models (many-to-many relationship)
export function defineUserRoomAssociation() {
    User.belongsToMany(Room, {
        through: 'UserRoom',  // The name of the join table (can be specified, default is UserRoom)
        foreignKey: 'userId', // Foreign key in the join table referencing User
        otherKey: 'roomId',   // Foreign key in the join table referencing Room
        as: 'rooms',          // Alias for the relationship
    });

    Room.belongsToMany(User, {
        through: 'UserRoom',
        foreignKey: 'roomId',
        otherKey: 'userId',
        as: 'users',          // Alias for the relationship
    });
}