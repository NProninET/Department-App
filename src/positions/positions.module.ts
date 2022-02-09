import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PositionsController } from './positions.controller';
import { Position } from './models/positions.model';
import { PositionsResolver } from './positions.resolver';
import { PositionsService } from './positions.service';
import { Department } from 'src/departments/models/departments.model';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService, PositionsResolver],
  imports: [SequelizeModule.forFeature([Position, Department])],
})
export class PositionsModule {}
