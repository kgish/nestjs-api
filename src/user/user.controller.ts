import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller()
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get('users')
  findAll() {
    return this.userService.findAll();
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
