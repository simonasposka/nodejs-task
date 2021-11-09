import { Request, Response, NextFunction } from 'express';
import { ServerResponse } from 'http';
import RequestHandler from '../service/request/RequestHandler';
import ApiError from '../error/ApiError';
import AbstractResponse from '../service/response/AbstractResponse';

const handle =
  (handler: RequestHandler) =>
  async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<ServerResponse | void> => {
    try {
      const handlerResponse: AbstractResponse = await handler(
        request,
        response,
        next
      );

      response.status(handlerResponse.status);
      const headers = handlerResponse.getHeaders();

      Object.keys(headers).forEach((header: string): void => {
        response.header(header, headers[header]);
      });

      return response.send(handlerResponse.getBody());
    } catch (e) {
      return next(ApiError.create(e));
    }
  };

export default handle;
