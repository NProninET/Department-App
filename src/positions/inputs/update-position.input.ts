import { BasePositionInput } from './position.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePositionInput extends PartialType(BasePositionInput) {
  @Field(() => Int, { description: 'Position ID' })
  id: number;
}
