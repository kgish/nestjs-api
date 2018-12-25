import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';

import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';

import { OperatorService } from './operator.service';
import { OperatorEntity } from './operator.entity';
import { OperatorDto } from './dto/operator.dto';

@Controller('operator')
export class OperatorController {

  constructor(private operatorService: OperatorService) {}

  @Post()
  create(@Body() data: OperatorDto): Promise<OperatorEntity> {
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
  update(@Param('id') id: string, @Body() data: Partial<OperatorDto>) {
    return this.operatorService.update(id, data);
  }

  @Delete()
  delete(@Param('id') id: string) {
    return this.operatorService.delete(id);
  }
}
