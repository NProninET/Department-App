import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from 'src/employees/employees.model';
import { Position } from 'src/positions/positions.model';
import { Department } from './departments.model';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { EmployeesService } from 'src/employees/employees.service';
import { UpdateDepartmentInput } from './inputs/update-department.input';

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
    const departments = await this.departmentRepository.findAll({
      include: [
        {
          model: Position,
          include: [
            {
              model: Employee,
              attributes: ['name', 'surname', 'email', 'age'],
            },
          ],
        },
      ],
    });

    return departments;
  }

  async getDepartmentById(id: number) {
    const department = await this.departmentRepository.findByPk(id, {
      include: [
        {
          model: Position,
          include: [
            {
              model: Employee,
              attributes: ['name', 'surname', 'email', 'age', 'positionId'],
            },
          ],
        },
      ],
    });
    return department.positions
    .map((position) => {
      return position.employees;
    });
  }

  async removeDepartment(id: number) {
    return await this.departmentRepository.destroy({ where: { id } });
  }

  async updateDepartment(id: number, dto: UpdateDepartmentDto) {
    const department = await this.departmentRepository.findByPk(id);
    await department.update(dto);

    await department.save();

    return department;
  }

  async updateDepartmentWithInput(id: number, input: UpdateDepartmentInput) {
    const department = await this.departmentRepository.findByPk(id);
    await department.update(input);

    await department.save();

    return department;
  }
}
