import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { EmployeesService } from "./employees.service";
import { Employee } from "./models/employees.model";
import { EmployeeBase } from "./models/employees-base.model";
import { CreateEmployeeInput } from "./inputs/create-employee.input";
import { UpdateEmployeeInput } from "./inputs/update-employee.input";

@Resolver(() => Employee)
export class EmployeesResolver {
    constructor(private readonly employeesService: EmployeesService) {}

    @Mutation(() => EmployeeBase, {name: 'createEmployee'})
    createEmployee(@Args('input') input: CreateEmployeeInput): Promise<EmployeeBase> {
        return this.employeesService.createEmployee(input);
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
        return this.employeesService.updateEmployee(input)
    }

    @Mutation(() => Int, {name: 'removeEmployee'})
    removeEmployee(@Args('id') id: number): Promise<number> {
        return this.employeesService.removeEmployee(id);
    }
}