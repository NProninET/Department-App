import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Position } from './models/positions.model';
import { UpdatePositionInput } from './inputs/update-position.input';
import { CreatePositionInput } from './inputs/create-position.input';
import { Department } from 'src/departments/models/departments.model';
import { Employee } from 'src/employees/models/employees.model';
import { PositionBase } from './models/positions-base.model';

@Injectable()
export class PositionsService {
  constructor(
    @InjectModel(Position) private positionRepository: typeof Position,
  ) {}

  async createPosition(input: CreatePositionInput): Promise<PositionBase> {
    const position = await this.positionRepository.create(input);
    return position;
  }

  async getAllPositions(): Promise<Position[]> {
    const positions = await this.positionRepository.findAll({
      include: [
        { model: Department },
        { model: Employee }
      ]
    });
    return positions;
  }

  async getPositionById(id: number): Promise<Position> {
    const position = await this.positionRepository.findByPk(id, {
      include: [{
        model: Department
      }]
    });
    return position;
  }

  async updatePosition(input: UpdatePositionInput): Promise<PositionBase> {
    const position = await this.positionRepository.findByPk(input.id);
    await position.update(input);
    await position.save();
    return position;
  }

  async removePosition(id: number): Promise<number> {
    return await this.positionRepository.destroy({where: {id}})
  }
}
