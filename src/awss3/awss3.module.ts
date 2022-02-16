import { Module } from '@nestjs/common';
import { AWSS3Service } from './awss3.service';

@Module({
  //controllers: [DepartmentsController],
  providers: [AWSS3Service],
  imports: [],
})
export class AWSS3Module {}
