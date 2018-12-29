import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { UserRO } from './interfaces/user-ro.interface';

@Controller()
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get('user')
  findAll() {
    return this.userService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string): Promise<UserRO> {
    return this.userService.findOne(id);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDto) {
    return this.userService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDto) {
    return this.userService.register(data);
  }
}
