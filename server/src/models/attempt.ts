import { Model, Sequelize, DataTypes, ForeignKey } from 'sequelize';
import { Room } from './index.js';
import { User } from './index.js';

export class Attempt extends Model {
  id!: number;
  startTime!: number;
  endTime!: number;
  attemptNumber!: number;
  isSuccessful!: boolean;
  roomID!: ForeignKey<typeof Room.prototype.id>;  // Use 'typeof Room.prototype.id' for the type
  userID!: ForeignKey<typeof User.prototype.id>;  // Use 'typeof User.prototype.id' for the type
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
      startTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      endTime: {
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
      roomID: {
        type: DataTypes.INTEGER,
        references: {
          model: Room,
          key: 'id',
        },
        allowNull: false,
      },
      userID: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id',
        },
        allowNull: false,
      },
    },
    {
      tableName: 'attempt',
      sequelize,
    }
  );

  return Attempt;  // Return the model
}