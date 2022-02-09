import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class BasePositionInput {

    @Field(() => String, { description: 'Position title' })
    title: string;

    @Field(() => String, { description: 'Position description' })
    description: string;
}