import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './models/employees.model';
import { UpdateEmployeeInput } from './inputs/update-employee.input';
import { CreateEmployeeInput } from './inputs/create-employee.input';
import { Position } from 'src/positions/models/positions.model';
import { Department } from 'src/departments/models/departments.model';
import { EmployeeBase } from './models/employees-base.model';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,
  ) {}
  
  async createEmployee(input: CreateEmployeeInput): Promise<EmployeeBase> {
    const employee = await this.employeeRepository.create(input);
    return employee;
  }

  async getAllEmployees(): Promise<Employee[]> {
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

  async getAllEmployeesInDepartment(department: number): Promise<Employee[]> {
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

  async getEmployeeById(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findByPk(id);
    return employee;
  }

  async updateEmployee(input: UpdateEmployeeInput): Promise<EmployeeBase> {
    const employee = await this.employeeRepository.findByPk(input.id)
    await employee.update(input);
    await employee.save();
    return employee;
  }
  
  async removeEmployee(id: number): Promise<number> {
    return await this.employeeRepository.destroy({where: {id}})
  }
}
