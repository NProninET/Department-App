import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from './departments.model';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department) private departmentRepository: typeof Department,
  ) {}
  async createDepartment(dto: CreateDepartmentDto) {
    const department = await this.departmentRepository.create(dto);

    return department;
  }

  async getAllDepartments() {
    const departments = await this.departmentRepository.findAll();

    return departments;
  }

  async getByTitle(title: string) {
    const user = await this.departmentRepository.findOne({ where: { title } });
    return user;
  }
}
