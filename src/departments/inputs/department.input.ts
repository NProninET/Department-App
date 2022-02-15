import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class BaseDepartmentInput {

    @Field(() => String, { 
        description: 'Department title',
        nullable: true
    })
    title: string;

    @Field(
        () => String, {
        description: 'Short description of department',
        nullable: true
    })
    description: string;
}