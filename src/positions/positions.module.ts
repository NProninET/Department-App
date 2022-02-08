import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PositionsController } from './positions.controller';
import { Position } from './positions.model';
import { PositionsResolver } from './positions.resolver';
import { PositionsService } from './positions.service';

@Module({
  controllers: [PositionsController],
  providers: [PositionsService, PositionsResolver],
  imports: [SequelizeModule.forFeature([Position])],
})
export class PositionsModule {}
