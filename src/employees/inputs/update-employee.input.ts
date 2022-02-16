import { BaseEmployeeInput } from './employee.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEmployeeInput extends PartialType(BaseEmployeeInput) {
  @Field(() => Int, {
    description: "Employee's ID",
    nullable: false,
  })
  id: number;
}
