import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class BaseEmployeeInput {

    @Field(
        () => String, {
            description: 'Employee\'s first name',
            nullable: true
    })
    name: string;

    @Field(
        () => String, {
            description: 'Employee\'s last name',
            nullable: true
    })
    surname: string;

    @Field(
        () => String, { 
            description: 'Employee\'s email' 
    })
    email: string;

    @Field(
        () => Int, {
            description: 'Employee\'s age',
            nullable: true
    })
    age: number;
}