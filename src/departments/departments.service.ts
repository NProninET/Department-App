import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from 'src/employees/employees.model';
import { Department } from './departments.model';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department) private departmentRepository: typeof Department
  ) {}
  async createDepartment(dto: CreateDepartmentDto) {
    const department = await this.departmentRepository.create(dto);

    return department;
  }

  async getAllDepartments() {
    const departments = await this.departmentRepository.findAll();

    return departments;
  }

  async getDepartmentById(id: number) {
    const department = await this.departmentRepository.findByPk(id);
    return department;
  }

  async removeDepartment(id: number) {
    return await this.departmentRepository.destroy({where: {id}})
  }

  async updateDepartment(id: number, dto: UpdateDepartmentDto) {
    const department = await this.departmentRepository.findByPk(id)
    await department.update(dto)

    await department.save()

    return department
  }
}
