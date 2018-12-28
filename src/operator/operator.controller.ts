import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';

import { OperatorService } from './operator.service';
import { OperatorEntity } from './operator.entity';
import { OperatorDto } from './dto/operator.dto';

import { ValidationPipe } from '../common/pipes/validation.pipe';

@Controller('operator')
export class OperatorController {

  private logger = new Logger('OperatorController');

  constructor(private operatorService: OperatorService) {
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() data: OperatorDto): Promise<OperatorEntity> {
    this.logger.log(JSON.stringify(data));
    return this.operatorService.create(data);
  }

  @Get()
  findAll(): Promise<OperatorEntity[]> {
    return this.operatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<OperatorEntity> {
    return this.operatorService.findOne(id);
  }

  @Put()
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() data: Partial<OperatorDto>) {
    this.logger.log(JSON.stringify(data));
    return this.operatorService.update(id, data);
  }

  @Delete()
  delete(@Param('id') id: string) {
    return this.operatorService.delete(id);
  }
}
