import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './models/employees.model';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeInput } from './inputs/update-employee.input';
import { CreateEmployeeInput } from './inputs/create-employee.input';
import { Position } from 'src/positions/models/positions.model';
import { Department } from 'src/departments/models/departments.model';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,
  ) {}
  
  async createEmployee(dto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.create(dto);

    return employee;
  }

  async createEmployeeWithInput(input: CreateEmployeeInput) {
    console.log(input);
    const employee = await this.employeeRepository.create(input);

    return employee;
  }

  async getAllEmployees() {
    const employees = await this.employeeRepository.findAll({
      include: {
        model: Position,
        include: [{
          model: Department
        }]
      }
    });
    return employees;
  }

  async getAllEmployeesInDepartment(department: number) {
    return this.employeeRepository.findAll({
      include: [{
        model: Position,
        where: { departmentId: department },
        include: [{
          model: Department
        }]
      }]
    });
  }

  async removeEmployee(id: number) {
    return await this.employeeRepository.destroy({where: {id}})
  }

  async getEmployeeById(id: number) {
    const employee = await this.employeeRepository.findByPk(id);
    return employee;
  }

  async updateEmployee(id: number, dto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findByPk(id)
    await employee.update(dto);
    await employee.save();
    return employee;
  }

  async updateEmployeeWithInput(id: number, input: UpdateEmployeeInput) {
    const employee = await this.employeeRepository.findByPk(id);
    await employee.update(input);
    await employee.save();
    return employee;
  }
}
