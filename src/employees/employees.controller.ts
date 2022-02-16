import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Patch,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @Post()
  create(@Res() res, @Body() employeeDto: CreateEmployeeDto) {
    const newEmployee = this.employeeService.createEmployeeDTO(employeeDto);
    return res.status(HttpStatus.OK).json({
      message: 'Employee created',
      payload: newEmployee,
    });
  }

  @Get('/:id')
  async getEmployeeById(@Res() res, @Param('id') id: number) {
    const employee = await this.employeeService.getEmployeeById(id);
    return res.status(HttpStatus.OK).json({
      message: `Employee #${id} fetched`,
      payload: employee,
    });
  }

  @Get()
  getAll(@Res() res) {
    const employees = this.employeeService.getAllEmployees();
    return res.status(HttpStatus.OK).json({
      message: 'Employees fetched',
      payload: employees,
    });
  }

  @Delete('/:id')
  deleteEmployee(@Res() res, @Param('id') id: number) {
    const employee = this.employeeService.removeEmployee(id);
    return res.status(HttpStatus.OK).json({
      message: `Employee #${id} deleted`,
      payload: employee,
    });
  }

  @Patch(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Param('id') id: number, @UploadedFile() file) {
    return await this.employeeService.upload(id, file);
  }
}
