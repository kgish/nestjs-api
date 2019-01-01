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

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';

import { OperatorService } from './operator.service';
import { OperatorEntity } from './operator.entity';
import { OperatorDto } from './dto/operator.dto';

import { ValidationPipe } from '../common/pipes/validation.pipe';

@ApiBearerAuth()
@ApiUseTags('operators')
@Controller('operators')
export class OperatorController {

  private logger = new Logger('OperatorController');

  constructor(private operatorService: OperatorService) {
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ title: 'Create operator' })
  @ApiResponse({ status: 201, description: 'Operator has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() data: OperatorDto): Promise<OperatorEntity> {
    this.logger.log(JSON.stringify(data));
    return this.operatorService.create(data);
  }

  @Get()
  @ApiOperation({ title: 'Get all operators' })
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(): Promise<OperatorEntity[]> {
    return this.operatorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ title: 'Get operator by id' })
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string): Promise<OperatorEntity> {
    return this.operatorService.findOne(id);
  }

  @Put()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ title: 'Update operator by id' })
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() data: Partial<OperatorDto>) {
    this.logger.log(JSON.stringify(data));
    return this.operatorService.update(id, data);
  }

  @Delete()
  @ApiOperation({ title: 'Delete operator by id' })
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  delete(@Param('id') id: string) {
    return this.operatorService.delete(id);
  }
}
