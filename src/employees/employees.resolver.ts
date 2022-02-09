import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { EmployeesService } from "./employees.service";
import { Employee } from "./models/employees.model";
import { CreateEmployeeInput } from "./inputs/create-employee.input";
import { UpdateEmployeeInput } from "./inputs/update-employee.input";

@Resolver(() => Employee)
export class EmployeesResolver {
    constructor(private readonly employeesService: EmployeesService) {}

    @Mutation(() => Employee, {name: 'createEmployee'})
    createEmployee(@Args('input') input: CreateEmployeeInput): Promise<Employee> {
        return this.employeesService.createEmployeeWithInput(input);
    }

    @Query(() => [Employee], {name: 'employees'})
    findAll(): Promise<Employee[]> {
        return this.employeesService.getAllEmployees();
    }

    @Query(() => [Employee], {name: 'employeesFromDepartment'})
    getEmployeesFromDepartment(@Args('id') id: number): Promise<Employee[]> {
        return this.employeesService.getAllEmployeesInDepartment(id);
    }

    @Query(() => Employee, {name: 'employee'})
    findOne(@Args('id') id: number): Promise<Employee> {
        return this.employeesService.getEmployeeById(id);
    }

    @Mutation(() => Employee, {name: 'updateEmployee'})
    updateEmployee(@Args('input') input: UpdateEmployeeInput): Promise<Employee> {
        return this.employeesService.updateEmployeeWithInput(input.id, input)
    }

    @Mutation(() => Employee, {name: 'removeEmployee'})
    removeEmployee(@Args('id') id: number): Promise<number> {
        return this.employeesService.removeEmployee(id);
    }
}