import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { GetOperationId } from '../utilities/get-operation-id';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  @ApiOperation(GetOperationId('Auth', 'GetToken'))
  async createToken(): Promise<any> {
    return await this.authService.createToken();
  }

  @Get('data')
  @UseGuards(AuthGuard())
  findAll() {
    // This route is restricted by AuthGuard
    // JWT strategy
  }
}
