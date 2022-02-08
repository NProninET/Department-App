import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateDepartmentInput {
  
  @Field(() => String, {description: 'Department title'})
  title: string;

  @Field(
    () => String, {
      description: 'Short description of department', 
      nullable: true
    })
  description: string;
}