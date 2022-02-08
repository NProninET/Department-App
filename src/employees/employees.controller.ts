import { Body, Controller, Get, Post, Delete, Patch, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
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

  @Get('/:id')
  getEmployeeById(@Param('id') id: number) {
    return this.employeeService.getEmployeeById(id);
  }

  @Delete('/:id')
  deleteDepartment(@Param('id') id: number) {
    this.employeeService.removeEmployee(id);
  }

  @Patch(':id')
  updateEmployee(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    const employee = this.employeeService.updateEmployee(id, updateEmployeeDto)
    return employee
  }
}
