import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './employees.model';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,
  ) {}
  async createEmployee(dto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.create(dto);

    return employee;
  }

  async getAllEmployees() {
    const employees = await this.employeeRepository.findAll();

    return employees;
  }

  async getAllEmployeesInDepartment(position) {
    return this.employeeRepository.findAll({ where: {positionId: position} });
  }

  async removeEmployee(id: number) {
    return await this.employeeRepository.destroy({where: {id}})
  }

  async getEmployeeById(id: number) {
    const employee = await this.employeeRepository.findByPk(id);
    return employee;
  }

  async updateEmployee(id: number, dto: UpdateEmployeeDto) {
    const department = await this.employeeRepository.findByPk(id)
    await department.update(dto)

    await department.save()

    return department
  }
}
