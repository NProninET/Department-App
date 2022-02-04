import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @Post()
  create(@Body() employeeDto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(employeeDto);
  }

  @Get()
  getAll() {
    return this.employeeService.getAllEmployees();
  }
}
