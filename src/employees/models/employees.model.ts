import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Position } from 'src/positions/models/positions.model';

interface EmployeeCreationAttrs {
  name: string;
  surname: string;
  email: string;
  age: number;
}

@ObjectType()
@Table({ tableName: 'employees' })
export class Employee extends Model<Employee, EmployeeCreationAttrs> {
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Field({ nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @Field({ nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  surname: string;

  @Field({ nullable: false })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Field({ nullable: true })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  age: number;

  @Field({ nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  photoURI: string;

  @ForeignKey(() => Position)
  @Column
  positionId: number;

  @Field(() => Position)
  @BelongsTo(() => Position)
  position: Position;
}
