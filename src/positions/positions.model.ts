import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface PositionCreationAttrs {
  title: string;
  description: string;
}

@Table({ tableName: 'positions' })
export class Position extends Model<Position, PositionCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING })
  description: string;
}
