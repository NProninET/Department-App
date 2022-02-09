import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeesController } from './employees.controller';
import { Employee } from './models/employees.model';
import { EmployeesResolver } from './employees.resolver';
import { EmployeesService } from './employees.service';
import { Position } from 'src/positions/models/positions.model';
import { Department } from 'src/departments/models/departments.model';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeesResolver],
  imports: [SequelizeModule.forFeature([Employee, Position, Department])],
})
export class EmployeesModule {}
