import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class S3Data {
  @Field()
  ETag: string;

  @Field()
  Location: string;

  @Field()
  key: string;

  @Field()
  Key: string;

  @Field()
  Bucket: string;
}
