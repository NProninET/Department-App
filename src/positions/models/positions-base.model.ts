import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PositionBase {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;
}
