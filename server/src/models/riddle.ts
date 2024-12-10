import { Model,
    type InferAttributes, type InferCreationAttributes, type CreationOptional, type Sequelize,
    DataTypes, ForeignKey } from 'sequelize';

    import type { Room } from './room';

    export class Riddle extends Model<InferAttributes<Riddle>, InferCreationAttributes<Riddle>> {
        declare id: number;
        declare name: string;
        declare description: string;
        declare answer: string;
        declare order: number;
        declare roomID: ForeignKey<Room['id']>
    }

    export function RiddleFactory(sequelize: Sequelize) {
        Riddle.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                answer: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                order: {
                    type: DataTypes.NUMBER,
                    allowNull: false
                },

            }, {
                tableName: 'riddle',
                sequelize,
            }
        );
        return Riddle;
    }