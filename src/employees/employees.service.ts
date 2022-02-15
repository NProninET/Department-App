import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './employees.model';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { S3 } from 'aws-sdk';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,
  ) {}

  async createEmployee(dto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.create(dto);

    return employee;
  }

  async getAllEmployees() {
    const employees = await this.employeeRepository.findAll();

    return employees;
  }

  async getAllEmployeesByPosition(position: number) {
    return this.employeeRepository.findAll({ where: { positionId: position } });
  }

  async removeEmployee(id: number) {
    return await this.employeeRepository.destroy({ where: { id } });
  }

  async getEmployeeById(id: number) {
    const employee = await this.employeeRepository.findByPk(id);
    return employee;
  }

  async updateEmployee(id: number, dto: UpdateEmployeeDto) {
    const department = await this.employeeRepository.findByPk(id);
    await department.update(dto);

    await department.save();

    return department;
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
