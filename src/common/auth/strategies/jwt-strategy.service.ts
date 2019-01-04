import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

// import { ConfigService } from 'nestjs-config';
import 'dotenv/config';

import { AuthService } from '../auth.service';
import { JwtPayload } from '../jwt-payload.model';

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
    this.logger.log(`key='${process.env.JWT_SECRET || 'jwtsecret12345!'}'`);
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const user = await this.auth.validatePayload(payload);
    if (!user) {
      return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
    }

    return done(null, user, payload.iat);
  }
}
