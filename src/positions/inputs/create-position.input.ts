import { InputType, Int, Field, PartialType } from "@nestjs/graphql";
import { BasePositionInput } from "./position.input";

@InputType()
export class CreatePositionInput extends PartialType(BasePositionInput) {

    @Field(() => Int, { description: 'Department ID' })
    departmentId: number;
}