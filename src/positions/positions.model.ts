import { BelongsTo, Column, DataType, ForeignKey, Model, Table, HasMany } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Department } from 'src/departments/departments.model';
import { Employee } from 'src/employees/employees.model';

interface PositionCreationAttrs {
  title: string;
  description: string;
}

@ObjectType()
@Table({ tableName: 'positions' })
export class Position extends Model<Position, PositionCreationAttrs> {
  
  @Field(type => Int)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Field({nullable: true})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @Field({nullable: true})
  @Column({ type: DataType.STRING })
  description: string;

  @Field({nullable: true})
  @ForeignKey(() => Department)
  @Column
  departmentId: number

  @BelongsTo(() => Department)
  department: Department

  @HasMany(() => Employee)
  employees: Employee[]
}
