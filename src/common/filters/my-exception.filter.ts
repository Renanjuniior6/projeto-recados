import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class MyExceptionFilter<
  T extends HttpException,
> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response: Response = context.getResponse();
    const request: Request = context.getRequest();

    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error =
      typeof response === 'string'
        ? {
            messagem: 'Error',
            statusCode,
          }
        : (exceptionResponse as object);

    response.status(statusCode).json({
      // Estamos 'turbinando' a nossa mensagem de erro, personalizando-a através dos filters
      ...error,
      data: new Date().toISOString(),
      path: request.url,
    });
  }
}
