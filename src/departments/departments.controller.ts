import { Body, Controller, Get, Post, Param, Delete, Patch } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';
import { DepartmentsService } from './departments.service';
import { UpdateDepartmentDto } from './dto/update-department.dto';
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
    return this.departmentService.getDepartmentById(id);
  }

  @Get('/:id/employees')
  getAllEmployeesInDepartment(@Param('id') id: number) {
    return this.employeesService.getAllEmployeesInDepartment(id);
  }

  @Delete('/:id')
  deleteDepartment(@Param('id') id: number) {
    const employees = this.employeesService.getAllEmployeesInDepartment(id)
    .then((empl => {
      if (empl.length) {
        return 'scvsierfnoiaewnf'
      } else {
        this.departmentService.removeDepartment(id)
      }
    }))
  }

  @Patch(':id')
  updateDepartment(@Param('id') id: number, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    const department = this.departmentService.updateDepartment(id, updateDepartmentDto)
    return department
  }
}
