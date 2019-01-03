import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus, Logger,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { User, UserRole } from '../../user/interfaces';

@Injectable()
export class RolesGuard implements CanActivate {

  private logger: Logger;

  constructor(private readonly reflector: Reflector) {
    this.logger = new Logger('RolesGuard');
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (!roles || roles.length === 0) {
      this.logger.log(`canActivate() roles='${JSON.stringify(roles)}' => true`);
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = () => user.roles.some((role) => !!roles.find((item) => item === role));

    if (user && user.roles && hasRole()) {
      this.logger.log(`canActivate() user='${JSON.stringify(user)}', roles='${JSON.stringify(roles)}' => true`);
      return true;
    }

    this.logger.log(`canActivate() user='${JSON.stringify(user)}', roles='${JSON.stringify(roles)}' => UNAUTHORIZED`);
    throw new HttpException('You do not have permission (roles)', HttpStatus.UNAUTHORIZED);
  }
}
