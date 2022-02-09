import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { DepartmentsService } from "./departments.service";
import { Department } from "./models/departments.model";
import { CreateDepartmentInput } from "./inputs/create-department.input";
import { UpdateDepartmentInput } from "./inputs/update-department.input";

@Resolver(() => Department)
export class DepartmentsResolver {
    constructor(private readonly departmentsService: DepartmentsService) {}

    @Mutation(() => Department, {name: 'createDepartment'})
    async createDepartmentWithInput(@Args('input') cdi: CreateDepartmentInput): Promise<Department> {
        return await this.departmentsService.createDepartmentWithInput(cdi);
    }

    @Query(() => [Department], {name: 'departments'})
    async findAll(): Promise<Department[]> {
        return await this.departmentsService.getAllDepartments();
    }

    @Query(() => Department, {name: 'department'})
    async findOne(@Args('id') id: number): Promise<Department> {
        return await this.departmentsService.getDepartmentById(id);
    }

    @Mutation(() => Department, {name: 'updateDepartment'})
    async updateDepartment(@Args('input') updateDepartmentInput: UpdateDepartmentInput): Promise<Department> {
        return await this.departmentsService.updateDepartmentWithInput(updateDepartmentInput.id, updateDepartmentInput)
    }

    @Mutation(() => Int)
    async removeDepartment(@Args('id') id: number): Promise<number> {
        return await this.departmentsService.removeDepartment(id);
    }
}