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
    this.logger.log('constructor()');
  }

  canActivate(context: ExecutionContext) {
    const result = super.canActivate(context);
    this.logger.log(`canActivate() => '${result}'`);
    return result;
  }

  handleRequest(err, user, info) {
    this.logger.log(`handleRequest() err='${err}', user='${user}', info='${info}'`);
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
