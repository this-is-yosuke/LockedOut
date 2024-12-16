import { Model,
    type InferAttributes, type InferCreationAttributes, type CreationOptional, Sequelize,
    DataTypes, ForeignKey } from 'sequelize';

    import type { Room } from './room';

    export class Riddle extends Model<InferAttributes<Riddle>, InferCreationAttributes<Riddle>> {
        declare id: CreationOptional<number>;
        declare name: string;
        declare content: string;
        declare answer: string;
        declare position: number;
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
                content: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                answer: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                position: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },

            }, {
                tableName: 'riddle',
                sequelize,
            }
        );
        return Riddle;
    }