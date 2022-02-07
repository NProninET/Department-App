import { BelongsTo, Column, DataType, ForeignKey, Model, Table, HasMany } from 'sequelize-typescript';
import { Department } from 'src/departments/departments.model';
import { Employee } from 'src/employees/employees.model';

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

  @ForeignKey(() => Department)
  @Column
  departmentId: number

  @BelongsTo(() => Department)
  department: Department

  @HasMany(() => Employee)
  employees: Employee[]
}
