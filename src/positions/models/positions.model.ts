import { BelongsTo, Column, DataType, ForeignKey, Model, Table, HasMany } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Department } from 'src/departments/models/departments.model';
import { Employee } from 'src/employees/models/employees.model';

interface PositionCreationAttrs {
    title: string;
    description: string;
}

@ObjectType()
@Table({
    tableName: 'positions',
    indexes: [{
        unique: true,
        fields: ['title', 'departmentId']
    }]
})
export class Position extends Model<Position, PositionCreationAttrs> {

    @Field(type => Int)
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
        allowNull: false
    })
    title: string;

    @Field({ nullable: true })
    @Column({ type: DataType.STRING })
    description: string;

    @ForeignKey(() => Department)
    @Column
    departmentId: number

    @Field(() => Department)
    @BelongsTo(() => Department)
    department: Department

    @HasMany(() => Employee)
    employees: Employee[]
}
