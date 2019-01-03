import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { Request } from 'express';
import { use } from 'passport';

// import { ConfigService } from 'nestjs-config';
import 'dotenv/config';

import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  private logger: Logger;

  constructor(
    private readonly auth: AuthService,
    // private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey: config.get('jwt.secret'),
      secretOrKey: process.env.JWT_SECRET || 'jwtsecret12345!',
    });
    this.logger = new Logger('JwtStrategy');
    this.logger.log(`constructor() key='${process.env.JWT_SECRET || 'jwtsecret12345!'}'`);
  }

  async validate(req: Request, payload: JwtPayload, done: VerifiedCallback) {
    const user = await this.auth.validateUser(payload.username);
    if (!user) {
      this.logger.log(`validate() payload='${JSON.stringify(payload)}', user='${JSON.stringify(user)}' => UNAUTHORIZED`);
      return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
    }

    this.logger.log(`validate() payload='${JSON.stringify(payload)}', user='${JSON.stringify(user)}' => OK`);
    return done(null, user);
  }
}
