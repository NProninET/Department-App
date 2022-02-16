import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from 'src/employees/models/employees.model';
import { Department } from './models/departments.model';
import { DepartmentBase } from './models/departments-base.model';
import { UpdateDepartmentInput } from './inputs/update-department.input';
import { ApolloError } from 'apollo-server-express';
import { Position } from 'src/positions/models/positions.model';
import { CreateDepartmentInput } from './inputs/create-department.input';
import { DepartmentRemove } from './models/departments-remove.model';

@Injectable()
export class DepartmentsService {

    constructor(
        @InjectModel(Department) private departmentRepository: typeof Department,
        @InjectModel(Position) private positionsRepositiory: typeof Position
    ) { }

    async createDepartment(input: CreateDepartmentInput): Promise<DepartmentBase> {
        try {
            const department = await this.departmentRepository.create(input);
            return department;
        } catch (e) {
            console.log(e);
            throw new ApolloError(`Отдел с названием '${input.title}' уже есть!`, 'ERR_EXISTING_NAME');
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
            department.positions.forEach((position) => { qty += position.employees.length; });
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
        let employees = [];
        department.positions.forEach(position => {
            position.employees.forEach(employee => {
                employee.position = position;
            });
            employees = employees.concat(position.employees);
        });
        employees.sort((a, b) => a.name.localeCompare(b.name));
        employees.sort((a, b) => a.surname.localeCompare(b.surname));
        department.setDataValue('employees', employees);
        department.setDataValue('employeesQuantity', employees.length);
        return department;
    }

    async updateDepartment(id: number, input: UpdateDepartmentInput): Promise<DepartmentBase> {
        const department = await this.departmentRepository.findByPk(id)
        await department.update(input)
        await department.save()
        return department
    }

    async removeDepartment(id: number): Promise<DepartmentRemove> {
        const department = await this.departmentRepository.findByPk(id, {
            include: [{
                model: Position,
                include: [{
                    model: Employee
                }]
            }]
        });
        let isEmpty = true;
        department.positions.forEach(position => {if (position.employees.length) {isEmpty = false;}});
        if(isEmpty) {
            const removedPositions = await this.positionsRepositiory.destroy( {where: { departmentId: id } });
            const removedDepartments = await this.departmentRepository.destroy({ where: { id } });
            return {
                removedPositions,
                removedDepartments
            };
        }
        throw new ApolloError('Department is not empty!');
    }
}
