import { HasMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Position } from 'src/positions/models/positions.model';
import { Employee } from 'src/employees/models/employees.model';

interface DepartmentCreationAttrs {
  title: string;
  description: string;
}

@ObjectType()
@Table({ tableName: 'departments' })
export class Department extends Model<Department, DepartmentCreationAttrs> {

  @Field(type => Int)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Field({ nullable: false })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @Field({ nullable: true })
  @Column({ type: DataType.STRING })
  description: string;

  @Field(() => [Position])
  @HasMany(() => Position)
  positions: Position[]

  @Field(
    type => Int, {
    description: 'Quantity of employees in department',
    nullable: true
  })
  @Column({type: DataType.VIRTUAL(DataType.INTEGER)})
  employeesQuantity: number;

  @Field(
    type => [Employee], {
    description: 'Employees in department',
    nullable: true
  })
  @Column({type: DataType.VIRTUAL(DataType.ARRAY)})
  employees: Employee[];
}
