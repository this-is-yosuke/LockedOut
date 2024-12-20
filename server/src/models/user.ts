import { 
    DataTypes, type Sequelize, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes,
    BelongsToManyAddAssociationMixin } from 'sequelize';
import bcrypt from 'bcrypt';
import { Room } from './room';

// interface UserAttributes {
//     id: number;
//     username: string;
//     email: string;
//     password: string;
// }

// interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User
    extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare password: string;

    // declare readonly createdAt: Date;
    // declare readonly updatedAt: Date;
    
    // Declaring the many-to-many
    declare addRoom: BelongsToManyAddAssociationMixin<Room, Room['id']>;
    declare addRooms: BelongsToManyAddAssociationMixin<Room[], Room['id'][]>;

    // Hash the password before saving the user
    async setPassword(password: string): Promise<void> {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);
    }
}

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
                beforeCreate: async (user: User) => {
                    await user.setPassword(user.password);
                },
                beforeUpdate: async (user: User) => {
                    await user.setPassword(user.password);
                },
            },
        }
    );

    return User;
}