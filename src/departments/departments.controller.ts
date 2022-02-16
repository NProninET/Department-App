/* import { Body, Controller, Get, Post, Param, Delete, Patch, Res, HttpStatus } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';
import { DepartmentsService } from './departments.service';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { PositionsService } from 'src/positions/positions.service';

@Controller('departments')
export class DepartmentsController {
  constructor(
    private departmentService: DepartmentsService,
    private positionService: PositionsService,
    private employeesService: EmployeesService,
  ) {}

  @Post()
  async create(@Res() res, @Body() departmentDto: CreateDepartmentDto) {
    const department = await this.departmentService.createDepartment(
      departmentDto,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Department was succesfully created',
      payload: department,
    });
  }

  @Get()
  async getAll(@Res() res) {
    const departments = await this.departmentService.getAllDepartments();
    return res.status(HttpStatus.OK).json({
      message: 'Departments are loaded',
      payload: departments,
    });
  }

  @Get('/:id')
  async getDepartmentById(
    @Res() res, 
    @Param('id') id: number
  ) {
    const department = await this.departmentService.getDepartmentById(id);
    return res.status(HttpStatus.OK).json({
      message: 'Department is loaded',
      payload: department,
    });
  }

  // @Get('/:id/employees')
  // async getAllEmployeesInDepartment(
  //   @Res() res, 
  //   @Param('id') id: number
  // ) {
  //   const department = await this.employeesService.getAllEmployeesInDepartment(id);
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Employees are loaded',
  //     payload: department,
  //   });
  // }

  @Get('/:id/positions')
  async getAllPositionsInDepartment(
    @Res() res, 
    @Param('id') id: number
  ) {
    const department = await this.positionService.getAllPositionsInDepartment(id);
    return res.status(HttpStatus.OK).json({
      message: 'Employees are loaded',
      payload: department,
    });
  }

   @Delete('/:id')
  async deleteDepartment(
    @Res() res, 
    @Param('id') id: number
  ) {
    const employees = await this.employeesService.getAllEmployeesByPosition(id);

    if (employees.length) {
      return res.status(HttpStatus.FORBIDDEN).json({
        message: 'Department is not empty!',
      });
    } else {
      const department = await this.departmentService.removeDepartment(id);
      return res.status(HttpStatus.OK).json({
        message: 'Department deleted',
        payload: department,
      });
    }
  } 

  @Patch(':id')
  async updateDepartment(
    @Res() res,
    @Param('id') id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    const department = await this.departmentService.updateDepartment(
      id,
      updateDepartmentDto,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Department modified',
      payload: department,
    });
  }
}
 */
