import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Position } from './positions.model';
import { CreatePositionDto } from './dto/create-position.dto';

@Injectable()
export class PositionsService {
  constructor(
    @InjectModel(Position) private PositionRepository: typeof Position,
  ) {}
  async createPosition(dto: CreatePositionDto) {
    const Position = await this.PositionRepository.create(dto);

    return Position;
  }

  async getAllPositions() {
    const Positions = await this.PositionRepository.findAll();

    return Positions;
  }

  async getByTitle(title: string) {
    const user = await this.PositionRepository.findOne({ where: { title } });
    return user;
  }
}
