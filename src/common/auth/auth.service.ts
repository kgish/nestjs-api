import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { sign, SignOptions } from 'jsonwebtoken';

// import { ConfigService } from 'nestjs-config';
import 'dotenv/config';

import { UserService } from '../../user/user.service';
import { JwtPayload } from './jwt-payload.model';
import { UserRO } from '../../user/interfaces';

@Injectable()
export class AuthService {
  private readonly jwtOptions: SignOptions;
  private readonly jwtKey: string;

  private logger: Logger;

  constructor(
    @Inject(forwardRef(() => UserService))
    readonly userService: UserService,
    // private readonly config: ConfigService,
  ) {
    this.logger = new Logger('AuthService');
    // this.jwtOptions = { expiresIn: config.get('jwt.expires') };
    // this.jwtKey = config.get('jwt.secret');
    const expiresIn = process.env.JWT_EXPIRES || '30m';
    const key = process.env.JWT_SECRET || 'jwtsecret12345!';
    this.logger.log(`key='${key}', expiresIn='${expiresIn}'`);
    this.jwtOptions = { expiresIn };
    this.jwtKey = key;
  }

  async signPayload(payload: JwtPayload): Promise<string> {
    this.logger.log('signPayload');
    return sign(payload, this.jwtKey, this.jwtOptions);
  }

  async validatePayload(validatePayload: JwtPayload): Promise<UserRO> {
    const username = validatePayload.username;
    const result = this.userService.findOneUsername(username);
    this.logger.log(`validatePayload: username='${username}' => ${result}`);
    return result;
  }
}
