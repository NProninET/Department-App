import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DepartmentRemove {
    @Field(
        () => Int, {
            description: 'Quantity of positions removed'
    })
    removedPositions: number;

    @Field(() => Int, {
        description: 'Quantity of departments removed'
    })
    removedDepartments: number;
}