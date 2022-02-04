import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private departmentService: DepartmentsService) {}

  @Post()
  create(@Body() departmentDto: CreateDepartmentDto) {
    return this.departmentService.createDepartment(departmentDto);
  }

  @Get()
  getAll() {
    return this.departmentService.getAllDepartments();
  }

  @Get(':title')
  getOne(@Param('title') title: string) {
    return this.departmentService.getByTitle(title);
  }
}
