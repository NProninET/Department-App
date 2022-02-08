import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from 'src/employees/employees.model';
import { EmployeesService } from 'src/employees/employees.service';
import { DepartmentsController } from './departments.controller';
import { Department } from './departments.model';
import { DepartmentsResolver } from './departments.resolver';
import { DepartmentsService } from './departments.service';
import { Position } from 'src/positions/positions.model';
import { PositionsService } from 'src/positions/positions.service';

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService, EmployeesService, PositionsService, DepartmentsResolver],
  imports: [SequelizeModule.forFeature([Department, Employee, Position])],
})
export class DepartmentsModule {}
