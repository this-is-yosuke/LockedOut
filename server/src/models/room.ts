import { Model, 
    type InferAttributes, type InferCreationAttributes, type CreationOptional, type Sequelize,
    DataTypes,
    ForeignKey} from 'sequelize';
import type { User } from './user';

export class Room extends Model<InferAttributes<Room>, InferCreationAttributes<Room>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string;
    declare type: string;
    declare creatorID: ForeignKey<User['id']>;
}

export function RoomFactory(sequelize: Sequelize) {
    Room.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: 'room',
            sequelize,
        }
    );
    return Room;
};