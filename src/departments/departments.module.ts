import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DepartmentsController } from './departments.controller';
import { Department } from './departments.model';
import { DepartmentsService } from './departments.service';

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  imports: [SequelizeModule.forFeature([Department])],
})
export class DepartmentsModule {}
