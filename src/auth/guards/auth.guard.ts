// Simple variation based on video https://www.youtube.com/watch?v=rDEWj3aK5hI&t=5s
import {
  CanActivate,
  ExecutionContext, HttpException, HttpStatus,
  Injectable,
} from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      return false;
    }

    request.user = await this.validateToken(request.headers.authorization);

    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
    const token =  auth.split(' ')[1];
    try {
      const decoded = await jwt.verify(token, process.env.TOKEN_SECRET)
      return decoded;
    } catch (err) {
      const message = `Token error: ${err.message || err.name}`;
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}
