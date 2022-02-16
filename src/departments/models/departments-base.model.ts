import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DepartmentBase {
  @Field(() => Int)
  id: number;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: true })
  description: string;
}
