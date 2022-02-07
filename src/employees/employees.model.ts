import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Department } from 'src/departments/departments.model';
import { Position } from 'src/positions/positions.model';

interface EmployeeCreationAttrs {
  name: string;
  surname: string;
  email: string;
  age: number;
}

@Table({ tableName: 'employees' })
export class Employee extends Model<Employee, EmployeeCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  age: number;

  @ForeignKey(() => Position)
  @Column
  positionId: number

  @BelongsTo(() => Position)
  position: Position
}
