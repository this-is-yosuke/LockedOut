import { Model, type InferAttributes, type InferCreationAttributes, type Sequelize, type CreationOptional, DataTypes, ForeignKey } from 'sequelize';
import { Room } from './room';
import { User } from './user';

export class Attempt extends Model<InferAttributes<Attempt>, InferCreationAttributes<Attempt>> {
    declare id: CreationOptional<number>;
    declare duration: number;
    declare attemptNumber: number;
    declare isSuccessful: boolean;
    declare roomId: ForeignKey<Room['id']>;
    declare userId: ForeignKey<User['userId']>;
}  

export function AttemptFactory(sequelize: Sequelize) {
    Attempt.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        duration: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        attemptNumber: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        isSuccessful: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        roomId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'room',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'user',
            key: 'userId',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        tableName: 'attempt',
        sequelize,
        indexes: [
          {
            unique: false,
            fields: ['roomId', 'userId'], // Composite index for roomId and userId
          },
        ],
      }
    );
    return Attempt;
}