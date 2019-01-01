import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { ApiException } from '../api-exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: ApiException = {
      statusCode: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message.error || exception.message || null
          : 'Internal server error'
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(
        `${request.method} ${request.url}`,
        exception.stack,
        'HttpExceptionFilter',
      );
    } else {
      Logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(errorResponse),
        'HttpExceptionFilter',
      );
    }

    response.status(status).json(errorResponse);
  }
}
