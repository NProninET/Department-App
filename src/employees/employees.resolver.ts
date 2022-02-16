import { Express } from 'express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmployeesService } from './employees.service';
import { Employee } from './models/employees.model';
import { EmployeeBase } from './models/employees-base.model';
import { CreateEmployeeInput } from './inputs/create-employee.input';
import { UpdateEmployeeInput } from './inputs/update-employee.input';

@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Mutation(() => EmployeeBase, { name: 'createEmployee' })
  async createEmployee(
    @Args('input') input: CreateEmployeeInput,
  ): Promise<EmployeeBase> {
    return await this.employeesService.createEmployee(input);
  }

  @Query(() => [Employee], { name: 'employees' })
  async findAll(): Promise<Employee[]> {
    return await this.employeesService.getAllEmployees();
  }

  @Query(() => [Employee], { name: 'employeesFromDepartment' })
  async getEmployeesFromDepartment(
    @Args('id') id: number,
  ): Promise<Employee[]> {
    return await this.employeesService.getAllEmployeesInDepartment(id);
  }

  @Query(() => Employee, { name: 'employee' })
  async findOne(@Args('id') id: number): Promise<Employee> {
    return await this.employeesService.getEmployeeById(id);
  }

  @Mutation(() => Employee, { name: 'updateEmployee' })
  async updateEmployee(
    @Args('input') input: UpdateEmployeeInput,
  ): Promise<Employee> {
    return await this.employeesService.updateEmployee(input);
  }

  @Mutation(() => Int, { name: 'removeEmployee' })
  async removeEmployee(@Args('id') id: number): Promise<number> {
    return await this.employeesService.removeEmployee(id);
  }

  @Mutation(() => Employee, { name: 'uploadEmployeePhoto' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadEmployeePhoto(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Employee> {
    return await this.employeesService.uploadEmployeePhoto(file);
  }
}
