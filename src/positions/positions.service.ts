import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Position } from './models/positions.model';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { UpdatePositionInput } from './inputs/update-position.input';
import { CreatePositionInput } from './inputs/create-position.input';
import { Department } from 'src/departments/models/departments.model';

@Injectable()
export class PositionsService {
  constructor(
    @InjectModel(Position) private positionRepository: typeof Position,
  ) {}

 async createPosition(dto: CreatePositionDto) {
    const position = await this.positionRepository.create(dto);
    return position;
  }

  async createPositionWithInput(input: CreatePositionInput) {
    const position = await this.positionRepository.create(input, {
      include: [{
        model: Department
      }]
    });
    return position;
  }

  async getAllPositions() {
    const positions = await this.positionRepository.findAll({
      include: [{
        model: Department
      }]
    });
    console.log(positions);
    return positions;
  }

  async getAllPositionsInDepartment(department: number) {
    return this.positionRepository.findAll({ where: {departmentId: department} });
  }

  async removePosition(id: number) {
    return await this.positionRepository.destroy({where: {id}})
  }

  async getPositionById(id: number) {
    const position = await this.positionRepository.findByPk(id, {
      include: [{
        model: Department
      }]
    });
    return position;
  }

  async updatePosition(id: number, dto: UpdatePositionDto) {
    const department = await this.positionRepository.findByPk(id)
    await department.update(dto)

    await department.save()

    return department
  }

  async updatePositionWithInput(id: number, dto: UpdatePositionInput) {
    const department = await this.positionRepository.findByPk(id, {
      include: [{
        model: Department
      }]
    }
    )
    await department.update(dto)

    await department.save()

    return department
  }
}
