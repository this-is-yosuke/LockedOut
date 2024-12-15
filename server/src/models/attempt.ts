import {Model, 
    type InferAttributes, type InferCreationAttributes, type Sequelize,
    DataTypes, ForeignKey } from 'sequelize'
import { Room } from './room';
import { User } from './user';

export class Attempt extends Model<InferAttributes<Attempt>, InferCreationAttributes<Attempt>> {
    declare id: number;
    declare startTime: number;
    declare endTime: number;
    declare attemptNumber: number;
    declare isSuccessful: boolean;
    declare roomID: ForeignKey<Room['id']>
    declare userID: ForeignKey<User['id']>
}

export function AttemptFactory(sequelize: Sequelize){
    Attempt.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            startTime: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            endTime: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            attemptNumber: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            isSuccessful: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
        },
        {
            tableName: 'attempt',
            sequelize
        }
    );
};