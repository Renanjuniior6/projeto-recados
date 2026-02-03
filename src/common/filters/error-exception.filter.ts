/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const response: Response = context.getResponse();
    const request: Request = context.getRequest();

    const statusCode: number = exception.getStatus()
      ? exception.getStatus()
      : 400;
    const exceptionResponse = exception.getResponse()
      ? exception.getResponse()
      : { message: 'Error', statusCode };

    response.status(statusCode).json({
      ...exceptionResponse,
      data: new Date().toISOString(),
      path: request.url,
    });
  }
}
