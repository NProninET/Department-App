import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { S3Data } from './S3Data.model';

@Injectable()
export class AWSS3Service {
  constructor(@InjectModel(S3Data) s3Data) {}

  
}
