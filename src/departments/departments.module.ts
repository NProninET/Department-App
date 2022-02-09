import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from 'src/employees/models/employees.model';
import { EmployeesService } from 'src/employees/employees.service';
import { DepartmentsController } from './departments.controller';
import { Department } from './models/departments.model';
import { DepartmentsResolver } from './departments.resolver';
import { DepartmentsService } from './departments.service';
import { Position } from 'src/positions/models/positions.model';
import { PositionsService } from 'src/positions/positions.service';

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService, EmployeesService, PositionsService, DepartmentsResolver],
  imports: [SequelizeModule.forFeature([Department, Employee, Position])],
})
export class DepartmentsModule {}
