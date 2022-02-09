import { Department } from "./departments.model";
import { ObjectType, PartialType, Int, Field } from "@nestjs/graphql";

@ObjectType()
export class DepartmentExtended extends PartialType(Department) {
    @Field(
        type => Int, { 
            description: 'Quantity of employees in department',
            defaultValue: 0
    })
    employeesQuantity: number;
}