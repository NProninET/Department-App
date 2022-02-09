import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from 'src/employees/models/employees.model';
import { Department } from './models/departments.model';
import { DepartmentBase } from './models/departments-base.model';
import { UpdateDepartmentInput } from './inputs/update-department.input';
import { ApolloError } from 'apollo-server-express';
import { Position } from 'src/positions/models/positions.model';
import { CreateDepartmentInput } from './inputs/create-department.input';

@Injectable()
export class DepartmentsService {

    constructor(
        @InjectModel(Department) private departmentRepository: typeof Department
    ) { }

    async createDepartment(input: CreateDepartmentInput): Promise<DepartmentBase> {
        try {
            const department = await this.departmentRepository.create(input);
            return department;
        } catch (e) {
            console.log(e);
            throw new ApolloError(`Department with title '${input.title}' already exists!`, '');
        }
    }

    async getAllDepartments(): Promise<Department[]> {
        const departments = await this.departmentRepository.findAll({
            include: [{
                model: Position,
                include: [{
                    model: Employee
                }]
            }], 
        });
        
        departments.forEach((department) => {
            let qty = 0;
            department.positions.forEach((position) => { qty += position.employees.length; })
            department.setDataValue('employeesQuantity', qty);
        });

        return departments;
    }

    async getDepartmentById(id: number): Promise<Department> {
        const department = await this.departmentRepository.findByPk(id, {
            include: [{
                model: Position,
                include: [{
                    model: Employee,
                }]
            }], 
        });
        return department;
    }

    async updateDepartment(id: number, input: UpdateDepartmentInput): Promise<DepartmentBase> {
        const department = await this.departmentRepository.findByPk(id)
        await department.update(input)
        await department.save()
        return department
    }

    async removeDepartment(id: number): Promise<number> {
        const linesRemoved = this.departmentRepository.destroy({ where: { id } });
        return linesRemoved;
    }
}
