import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from 'src/employees/employees.model';
import { Department } from './departments.model';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { EmployeesService } from 'src/employees/employees.service';
import { UpdateDepartmentInput } from './inputs/update-department.input';
import { ApolloError } from 'apollo-server-express';
import { Position } from 'src/positions/positions.model';

@Injectable()
export class DepartmentsService {
    constructor(
        @InjectModel(Department) private departmentRepository: typeof Department
    ) { }
    async createDepartment(dto: CreateDepartmentDto): Promise<Department> {
        try {
            const department = await this.departmentRepository.create(dto);
            return department;
        } catch (e) {
            console.log(e);
            throw new ApolloError(`Department with title '${dto.title}' already exists!`, '');
        }
    }

    async getAllDepartments(): Promise<Department[]> {
        const departments = await this.departmentRepository.findAll({
            include: [{
                model: Position,
                attributes: [
                    'title', 'id'
                ],
                include: [{
                    model: Employee
                }]
            }]
        });

        return departments;
    }

    async getDepartmentById(id: number): Promise<Department> {
        const department = await this.departmentRepository.findByPk(id);
        return department;
    }

    async removeDepartment(id: number): Promise<number> {
        const linesRemoved = this.departmentRepository.destroy({ where: { id } });
        return linesRemoved;
    }

    async updateDepartment(id: number, dto: UpdateDepartmentDto): Promise<Department> {
        const department = await this.departmentRepository.findByPk(id)
        await department.update(dto)
        await department.save()
        return department
    }

    async updateDepartmentWithInput(id: number, input: UpdateDepartmentInput): Promise<Department> {
        const department = await this.departmentRepository.findByPk(id)
        await department.update(input)
        await department.save()
        return department
    }
}
