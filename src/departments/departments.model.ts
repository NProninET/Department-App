import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface DepartmentCreationAttrs {
  title: string;
  description: string;
}

@Table({ tableName: 'departments' })
export class Department extends Model<Department, DepartmentCreationAttrs> {
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
