import { InputType, Int, Field, PartialType } from "@nestjs/graphql";
import { BaseEmployeeInput } from "./employee.input";

@InputType()
export class CreateEmployeeInput extends PartialType(BaseEmployeeInput) {

    @Field(() => String, { 
        description: 'Employee\'s email',
        nullable: false
    })
    email: string;

    @Field(
        () => Int, {
        description: 'Employee\'s position ID',
        nullable: false
    })
    positionId: number;
}