import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put, UseGuards,
  UsePipes,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { OperatorService } from './operator.service';
import { OperatorEntity } from './operator.entity';
import { OperatorDto } from './dto/operator.dto';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { GetOperationId } from '../common/utilities/get-operation-id';
import { ApiException } from '../common/api-exception';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../user/interfaces';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiUseTags('operators')
@Controller('operators')
export class OperatorController {

  private logger = new Logger('OperatorController');

  constructor(private operatorService: OperatorService) {
  }

  @Post()
  @Roles(UserRole.admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({ type: OperatorEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiForbiddenResponse({ type: ApiException })
  @ApiOperation(GetOperationId(OperatorEntity.modelName, 'Create'))
  create(@Body() data: OperatorDto): Promise<OperatorEntity> {
    this.logger.log(JSON.stringify(data));
    return this.operatorService.create(data);
  }

  @Get()
  @Roles(UserRole.admin, UserRole.support)
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOkResponse({ type: OperatorEntity, isArray: true })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiForbiddenResponse({ type: ApiException })
  @ApiOperation(GetOperationId(OperatorEntity.modelName, 'GetAll'))
  findAll(): Promise<OperatorEntity[]> {
    return this.operatorService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.admin, UserRole.support)
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOkResponse({ type: OperatorEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiForbiddenResponse({ type: ApiException })
  @ApiOperation(GetOperationId(OperatorEntity.modelName, 'GetOne'))
  findOne(@Param('id') id: string): Promise<OperatorEntity> {
    return this.operatorService.findOne(id);
  }

  @Put()
  @Roles(UserRole.admin, UserRole.support)
  @UseGuards(AuthGuard(), RolesGuard)
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({ type: OperatorEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiForbiddenResponse({ type: ApiException })
  @ApiOperation(GetOperationId(OperatorEntity.modelName, 'GetOne'))
  @ApiOperation(GetOperationId(OperatorEntity.modelName, 'Update'))
  update(@Param('id') id: string, @Body() data: Partial<OperatorDto>) {
    this.logger.log(JSON.stringify(data));
    return this.operatorService.update(id, data);
  }

  @Delete()
  @Roles(UserRole.admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOkResponse({ type: OperatorEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiForbiddenResponse({ type: ApiException })
  @ApiOperation(GetOperationId(OperatorEntity.modelName, 'Delete'))
  delete(@Param('id') id: string) {
    return this.operatorService.delete(id);
  }
}
