import { Body, Controller, Get, Post, Delete, Patch, Param, Res, HttpStatus  } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('positions')
export class PositionsController {
  constructor(private positionService: PositionsService) {}

  @Post()
  create(
    @Res() res, 
    @Body() positionDto: CreatePositionDto
  ) {
    const newPosition = this.positionService.createPosition(positionDto);
    return res.status(HttpStatus.OK).json({
      message: 'Position created',
      payload: newPosition
    });
  }

  @Get()
  getAll(
    @Res() res
  ) {
    const positions = this.positionService.getAllPositions();
    return res.status(HttpStatus.OK).json({
      message: 'Positions fetched',
      payload: positions
    });
  }

  @Get('/:id')
  getPositionById(
    @Res() res, 
    @Param('id') id: number
  ) {
    const position = this.positionService.getPositionById(id);
    return res.status(HttpStatus.OK).json({
      message: `Position #${id} fetched`,
      payload: position
    });
  }

  @Delete('/:id')
  deletePosition(
    @Res() res, 
    @Param('id') id: number
  ) {
    const position = this.positionService.removePosition(id);
    return res.status(HttpStatus.OK).json({
      message: `Position #${id} deleted`,
      payload: position
    });
  }

  @Patch(':id')
  updatePosition(
    @Res() res, 
    @Param('id') id: number, 
    @Body() updatePositionDto: UpdatePositionDto
  ) {
    const position = this.positionService.updatePosition(id, updatePositionDto)
    return res.status(HttpStatus.OK).json({
      message: `Position #${id} updated`,
      payload: position
    });
  }
}

