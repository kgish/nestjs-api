import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../../user/user.service';
import { Role } from '../../user/interfaces';

@Injectable()
export class AuthService {

  logger: Logger;

  constructor(private readonly jwtService: JwtService,
              private readonly userService: UserService) {
    this.logger = new Logger('AuthService');
    this.logger.log('constructor()');
  }

  async createToken() {
    const user: JwtPayload = { username: 'kiffin', role: Role.user };
    const accessToken = this.jwtService.sign(user);
    const expiresIn = process.env.JWT_EXPIRES || '30m';
    const result = { expiresIn, accessToken };
    this.logger.log(`createToken() => '${JSON.stringify(result)}'`);
    return result;
  }

  async validateUser(payload: JwtPayload): Promise<any> {
     const username = payload.username;
     const result = this.userService.findOneUsername(username);
     this.logger.log(`validatePayload: username='${username}' => ${result}`);
     return result;
  }
}
