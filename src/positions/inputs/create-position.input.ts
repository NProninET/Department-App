import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreatePositionInput {
  
  @Field(() => String, {description: 'Position title'})
  title: string;
  
  @Field(() => String, {description: 'Position description'})
  description: string;
}