import { BaseDepartmentInput } from "./department.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateDepartmentInput extends PartialType(BaseDepartmentInput) {
    @Field(()=> Int, {description: 'Department ID'})
    id: number;
}