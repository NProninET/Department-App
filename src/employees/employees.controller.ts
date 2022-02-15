import { Body, Controller, Get, Post, Delete, Patch, Param, Res, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @Post()
  create(@Res() res, @Body() employeeDto: CreateEmployeeDto) {
    const newEmployee = this.employeeService.createEmployee(employeeDto);
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

  @Patch(':id')
  updateEmployee(
    @Res() res,
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    const employee = this.employeeService.updateEmployee(id, updateEmployeeDto);
    return res.status(HttpStatus.OK).json({
      message: `Employee #${id} updated`,
      payload: employee,
    });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file) {
  return await this.employeeService.upload(file);
}
}
