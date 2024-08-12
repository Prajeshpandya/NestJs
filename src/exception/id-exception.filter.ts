import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { IdException } from './id-exception';
import { Response } from 'express';

@Catch(IdException)
export class idExceptionError implements ExceptionFilter {
  catch(exception: IdException, host: ArgumentsHost) {
    //basically ArgumentHost define the type of the service, like HTTP,Socket etc..
    const body = {
      message: exception.message,
      error: 'Id Error!',
    };

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json(body);
  }
}