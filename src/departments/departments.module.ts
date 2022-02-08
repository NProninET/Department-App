import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from 'src/employees/employees.model';
import { EmployeesService } from 'src/employees/employees.service';
import { DepartmentsController } from './departments.controller';
import { Department } from './departments.model';
import { DepartmentsResolver } from './departments.resolver';
import { DepartmentsService } from './departments.service';

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService, EmployeesService, DepartmentsResolver],
  imports: [SequelizeModule.forFeature([Department, Employee])],
})
export class DepartmentsModule {}
