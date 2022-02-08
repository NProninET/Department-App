import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { DepartmentsService } from "./departments.service";
import { Department } from "./departments.model";
import { CreateDepartmentInput } from "./inputs/create-department.input";
import { UpdateDepartmentInput } from "./inputs/update-department.input";

@Resolver(() => Department)
export class DepartmentsResolver {
    constructor(private readonly departmentsService: DepartmentsService) {}

    @Mutation(() => Department)
    createDepartment(@Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput) {
        return this.departmentsService.createDepartment(createDepartmentInput);
    }

    @Query(() => [Department], {name: 'departments'})
    findAll() {
        return this.departmentsService.getAllDepartments();
    }

    @Query(() => Department, {name: 'department'})
    findOne(@Args('id') id: number) {
        return this.departmentsService.getDepartmentById(id);
    }

    @Mutation(() => Department)
    updateDepartment(@Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput) {
        return this.departmentsService.updateDepartmentWithInput(updateDepartmentInput.id, updateDepartmentInput)
    }

    @Mutation(() => Department)
    removeDepartment(@Args('id') id: number) {
        return this.departmentsService.removeDepartment(id);
    }
}