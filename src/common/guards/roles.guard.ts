import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Role } from '../../user/interfaces/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());

    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = () => user.roles.some((role) => !!roles.find((item) => item === role));

    if (user && user.roles && hasRole()) {
      return true;
    }

    throw new HttpException('You do not have permission (roles)', HttpStatus.UNAUTHORIZED);
  }
}
