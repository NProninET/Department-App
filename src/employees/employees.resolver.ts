import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { EmployeesService } from "./employees.service";
import { Employee } from "./employees.model";
import { CreateEmployeeInput } from "./inputs/create-employee.input";
import { UpdateEmployeeInput } from "./inputs/update-employee.input";

@Resolver(() => Employee)
export class EmployeesResolver {
    constructor(private readonly employeesService: EmployeesService) {}

    @Mutation(() => Employee, {name: 'createEmployee'})
    createEmployee(@Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput) {
        return this.employeesService.createEmployee(createEmployeeInput);
    }

    @Query(() => [Employee], {name: 'employees'})
    findAll() {
        return this.employeesService.getAllEmployees();
    }

    @Query(() => Employee, {name: 'employee'})
    findOne(@Args('id') id: number) {
        return this.employeesService.getEmployeeById(id);
    }

    @Mutation(() => Employee, {name: 'updateEmployee'})
    updateEmployeet(@Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeInput) {
        return this.employeesService.updateEmployeeWithInput(updateEmployeeInput.id, updateEmployeeInput)
    }

    @Mutation(() => Employee, {name: 'removeEmployee'})
    removeEmployee(@Args('id') id: number) {
        return this.employeesService.removeEmployee(id);
    }
}