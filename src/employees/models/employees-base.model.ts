import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmployeeBase {
  
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  surname: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: true })
  age: number;

}
