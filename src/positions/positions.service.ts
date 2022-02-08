import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Position } from './positions.model';
import { Employee } from 'src/employees/employees.model';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionsService {
  constructor(
    @InjectModel(Position) private positionRepository: typeof Position,
  ) {}

 async createPosition(dto: CreatePositionDto) {
    const position = await this.positionRepository.create(dto);

    return position;
  }

  async getAllPositions() {
    const positions = await this.positionRepository.findAll();

    return positions;
  }

  async getAllPositionsInDepartment(department: number) {
    return this.positionRepository.findAll({ where: {departmentId: department}, include: [Employee] });
  }

  async removePosition(id: number) {
    return await this.positionRepository.destroy({where: {id}})
  }

  async getPositionById(id: number) {
    const position = await this.positionRepository.findByPk(id);
    return position;
  }

  async updatePosition(id: number, dto: UpdatePositionDto) {
    const department = await this.positionRepository.findByPk(id)
    await department.update(dto)

    await department.save()

    return department
  }
}
