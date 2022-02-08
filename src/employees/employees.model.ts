import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Position } from 'src/positions/positions.model';

interface EmployeeCreationAttrs {
  name: string;
  surname: string;
  email: string;
  age: number;
}

@ObjectType()
@Table({ tableName: 'employees' })
export class Employee extends Model<Employee, EmployeeCreationAttrs> {
  
  @Field(type => Int)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Field({ nullable: true })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Field({ nullable: true })
  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @Field({ nullable: true })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Field({ nullable: true })
  @Column({ type: DataType.INTEGER, allowNull: false })
  age: number;

  @ForeignKey(() => Position)
  @Column
  positionId: number

  @Field(() => Position)
  @BelongsTo(() => Position)
  position: Position
}
