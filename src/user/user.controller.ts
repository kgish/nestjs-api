import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Controller()
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get('user')
  findAll() {
    return this.userService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string): Promise<UserEntity> {
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
