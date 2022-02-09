import { HasMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Position } from 'src/positions/models/positions.model';

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

  @Field({nullable: false})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @Field({nullable: true})
  @Column({ type: DataType.STRING })
  description: string;

  @HasMany(() => Position)
  positions: Position[]
}
