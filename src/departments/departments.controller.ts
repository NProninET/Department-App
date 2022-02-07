import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private departmentService: DepartmentsService, private employeesService: EmployeesService) {}

  @Post()
  create(@Body() departmentDto: CreateDepartmentDto) {
    return this.departmentService.createDepartment(departmentDto);
  }

  @Get()
  getAll() {
    return this.departmentService.getAllDepartments();
  }

  @Get('/:id')
  getDepartmentById(@Param('id') id: number) {
    return this.departmentService.getById(id);
  }

  @Get('/:id/employees')
  getAllEmployeesTwo(@Param('id') id: number) {
    return this.employeesService.getAllEmployeesTwo(id);
  }
}
