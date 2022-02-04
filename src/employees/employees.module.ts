import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeesController } from './employees.controller';
import { Employee } from './employees.model';
import { EmployeesService } from './employees.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [SequelizeModule.forFeature([Employee])],
})
export class EmployeesModule {}
