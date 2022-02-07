import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PositionsController } from './positions.controller';
import { Position } from './positions.model';
import { PositionsService } from './positions.service';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService],
  imports: [SequelizeModule.forFeature([Position])],
})
export class PositionsModule {}
