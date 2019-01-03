import {
  ExecutionContext,
  Injectable, Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  logger: Logger;

  constructor() {
    super();
    this.logger = new Logger('JwtAuthGuard');
  }

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const result = super.canActivate(context);
    this.logger.log(`canActivate() => '${JSON.stringify(result)}'`);
    return result;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      this.logger.error(err);
      this.logger.error(info);
      this.logger.error(`handleRequest() user='${user}' => UNAUTHORIZED`);
      throw err || new UnauthorizedException();
    }
    this.logger.log(`handleRequest() => '${JSON.stringify(user)}'`);
    return user;
  }
}
