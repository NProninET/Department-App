import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
//import { DepartmentsController } from './departments.controller';
import { Department } from './models/departments.model';
import { DepartmentsResolver } from './departments.resolver';
import { DepartmentsService } from './departments.service';

@Module({
  //controllers: [DepartmentsController],
  providers: [DepartmentsService, DepartmentsResolver],
  imports: [SequelizeModule.forFeature([Department])],
})
export class DepartmentsModule {}
