import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { DepartmentsService } from "./departments.service";
import { Department } from "./models/departments.model";
import { CreateDepartmentInput } from "./inputs/create-department.input";
import { UpdateDepartmentInput } from "./inputs/update-department.input";
import { DepartmentBase } from "./models/departments-base.model";
import { DepartmentRemove } from "./models/departments-remove.model";

@Resolver(() => Department)
export class DepartmentsResolver {
    constructor(private readonly departmentsService: DepartmentsService) {}

    @Mutation(() => DepartmentBase, {name: 'createDepartment'})
    async createDepartmentWithInput(@Args('input') input: CreateDepartmentInput): Promise<DepartmentBase> {
        return await this.departmentsService.createDepartment(input);
    }

    @Query(() => [Department], {name: 'departments'})
    async findAll(): Promise<Department[]> {
        const departments =  await this.departmentsService.getAllDepartments();
        return departments;
    }

    @Query(() => Department, {name: 'department'})
    async findOne(@Args('id') id: number): Promise<Department> {
        return await this.departmentsService.getDepartmentById(id);
    }

    @Mutation(() => DepartmentBase, {name: 'updateDepartment'})
    async updateDepartment(@Args('input') input: UpdateDepartmentInput): Promise<DepartmentBase> {
        return await this.departmentsService.updateDepartment(input.id, input)
    }

    @Mutation(() => DepartmentRemove)
    async removeDepartment(@Args('id') id: number): Promise<DepartmentRemove> {
        return await this.departmentsService.removeDepartment(id);
    }
}