import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { APIResponse } from '../interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload: APIResponse = {
      statusCode: status,
      exception: exception.name ? exception.name : exception.message,
      message: this.getMessage(exception),
      data: null,
      meta: null,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    response.status(status).json(payload);
  }

  getMessage(exception) {
    if (exception instanceof HttpException) {
      console.log(exception.message);
      if (typeof exception.message === 'string') {
        return exception.message;
      } else if (Array.isArray(exception.message)) {
        return exception.message;
      } else if (typeof exception.message === 'object') {
        return exception.message;
      } else {
        return exception.toString();
      }
    } else {
      return exception.message;
    }
  }
}

// let apiResponce = {
//     data: data,
//     code: code,
//     message: message,
//     meta: meta,
//     success: success,
//     responceTime: getISODateTime,
//   }
