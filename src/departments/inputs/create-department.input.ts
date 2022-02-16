import { InputType, Field, PartialType } from '@nestjs/graphql';
import { BaseDepartmentInput } from './department.input';

@InputType()
export class CreateDepartmentInput extends PartialType(BaseDepartmentInput) {
  @Field(() => String, {
    description: 'Department title',
    nullable: false,
  })
  title: string;
}
