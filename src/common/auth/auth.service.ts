import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from 'nestjs-config';
import 'dotenv/config';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserRO, UserRole } from '../../user/interfaces';
import { UserService } from '../../user/user.service';
import { TokenRO } from './interfaces/token-ro.interface';

@Injectable()
export class AuthService {

  logger: Logger;

  key: string;
  expiresIn: string;

  constructor(private readonly jwtService: JwtService,
              // private readonly config: ConfigService,
              // @Inject(forwardRef(() => UserService))
              private readonly userService: UserService
  ) {
    this.logger = new Logger('AuthService');
    this.expiresIn = process.env.JWT_EXPIRES || '30m';
    this.key = process.env.JWT_SECRET || 'jwtsecret12345!';
    this.logger.log(`constructor() key='${this.key}', expiresIn='${this.expiresIn}'`);
  }

  async createToken(): Promise<TokenRO> {
    const expiresIn = this.expiresIn;
    const jwtpayload: JwtPayload = { username: 'kiffin@coin.nl', role: UserRole.user };
    const accessToken = this.jwtService.sign(jwtpayload);
    return { expiresIn, accessToken };
  }

  async signPayload(payload: JwtPayload): Promise<string> {
    const result = this.jwtService.sign(payload);
    this.logger.log(`signPayload() payload='${JSON.stringify(payload)}' => '${JSON.stringify(result)}'`);
    return result;
  }

  async validateUser(username: string): Promise<UserRO> {
    const result = this.userService.findOneUsername(username);
    // const result: UserRO = { username: 'kiffin', id: '123', role: Role.user, created: new Date(), updated: new Date() };
    this.logger.log(`validateUser(): username='${username}' => ${result}`);
    return result;
  }
}
