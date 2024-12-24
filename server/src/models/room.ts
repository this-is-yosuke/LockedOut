import { Model, 
    type InferAttributes, type InferCreationAttributes, type CreationOptional, Sequelize,
    DataTypes, ForeignKey, type BelongsToManyAddAssociationMixin} from 'sequelize';
import type { User } from './user';

export class Room extends Model<InferAttributes<Room>, InferCreationAttributes<Room>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string;
    declare type: string;
    declare difficulty: number;
    declare image: string;
    declare creatorID: ForeignKey<User['userId']>; 
    // Declaring the many-to-many
    declare addUsers: BelongsToManyAddAssociationMixin<User[], User['userId'][]>;
    declare addUser: BelongsToManyAddAssociationMixin<User, User['userId']>;
}

export function RoomFactory(sequelize: Sequelize) {
    Room.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            difficulty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            creatorID: { // Define creatorId as a Foreign Key
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users', // Make sure this matches your users table
                    key: 'userId',  // The column in the users table
                },
            },
        },
        {
            sequelize,
            modelName: 'room',
            tableName: 'rooms', // Ensure the correct table name
        }
    );
    return Room;
}