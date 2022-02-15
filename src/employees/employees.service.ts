import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './models/employees.model';
import { UpdateEmployeeInput } from './inputs/update-employee.input';
import { CreateEmployeeInput } from './inputs/create-employee.input';
import { Position } from 'src/positions/models/positions.model';
import { Department } from 'src/departments/models/departments.model';
import { EmployeeBase } from './models/employees-base.model';
import { S3 } from 'aws-sdk';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,
  ) {}
  
  async createEmployee(input: CreateEmployeeInput): Promise<EmployeeBase> {
    const employee = await this.employeeRepository.create(input);
    return employee;
  }

  async createEmployeeDTO(input: CreateEmployeeDto): Promise<EmployeeBase> {
    const employee = await this.employeeRepository.create(input);
    return employee;
  }

  async getAllEmployees(): Promise<Employee[]> {
    const employees = await this.employeeRepository.findAll({
      include: {
        model: Position,
        include: [{
          model: Department
        }]
      }
    });
    return employees;
  }

  async getAllEmployeesInDepartment(department: number): Promise<Employee[]> {
    return this.employeeRepository.findAll({
      include: [{
        model: Position,
        where: { departmentId: department },
        include: [{
          model: Department
        }]
      }]
    });
  }

  async getEmployeeById(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findByPk(id);
    return employee;
  }

  async updateEmployee(input: UpdateEmployeeInput): Promise<Employee> {
    const employee = await this.employeeRepository.findByPk(input.id, {
      include: {
        model: Position
      }
    })
    await employee.update(input);
    await employee.save();
    return employee;
  }

  async removeEmployee(id: number): Promise<number> {
    return await this.employeeRepository.destroy({where: {id}})
  }

  async upload(file) {
    const { originalname } = file;
    const bucketS3 = process.env.AWS_BUCKET_NAME;
    return await this.uploadS3(file.buffer, bucketS3, originalname);
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      console.log(resolve)
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
}
