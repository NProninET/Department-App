import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';

@Controller('positions')
export class PositionsController {
  constructor(private positionService: PositionsService) {}

  @Post()
  create(@Body() PositionDto: CreatePositionDto) {
    return this.positionService.createPosition(PositionDto);
  }

  @Get()
  getAll() {
    return this.positionService.getAllPositions();
  }

  @Get(':title')
  getOne(@Param('title') title: string) {
    return this.positionService.getByTitle(title);
  }
}
