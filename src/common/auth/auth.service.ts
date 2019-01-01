import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { sign, SignOptions } from 'jsonwebtoken';
import { ConfigService } from 'nestjs-config';
import { UserService } from '../../user/user.service';
import { JwtPayload } from './jwt-payload.model';
import { UserRO } from '../../user/interfaces/user-ro.interface';

@Injectable()
export class AuthService {
  private readonly jwtOptions: SignOptions;
  private readonly jwtKey: string;

  constructor(
    @Inject(forwardRef(() => UserService))
    readonly userService: UserService,
    private readonly config: ConfigService,
  ) {
    this.jwtOptions = { expiresIn: config.get('jwt.expires') };
    this.jwtKey = config.get('jwt.secret');
  }

  async signPayload(payload: JwtPayload): Promise<string> {
    return sign(payload, this.jwtKey, this.jwtOptions);
  }

  async validatePayload(validatePayload: JwtPayload): Promise<UserRO> {
    return this.userService.findOneUsername(validatePayload.username);
  }
}
