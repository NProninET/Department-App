import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PositionBase {

    @Field(type => Int)
    id: number;

    @Field({ nullable: true })
    title: string;

    @Field({ nullable: true })
    description: string;
}
