import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Position } from './positions.model';
import { CreatePositionDto } from './dto/create-position.dto';

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

  async getByTitle(title: string) {
    const position = await this.positionRepository.findOne({ where: { title } });
    return position;
  }
}
