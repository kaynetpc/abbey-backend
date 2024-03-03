import ResponseError from './responseErrors';
import { Response } from 'express';


interface ISendResponse<T> {
  response: Response, data: T, message: string, statusCode?: number, hasError?: boolean
}

interface ISendErrorResponse {
  response: Response, error: unknown, errMsg?: string
}
export class ResponseService {

  static sendError({error, response, errMsg}: ISendErrorResponse) {
    const nError = error as ResponseError;
    response.status(nError.status).send({statusCode: nError.status, message: errMsg || nError.message, hasError: true, data: null});
  }

  static send<T>({data, message, response, statusCode, hasError}: ISendResponse<T>) {
    response.status(statusCode ?? 200).send({statusCode: statusCode ?? 200, message, hasError: hasError || false, data});
  }
}
