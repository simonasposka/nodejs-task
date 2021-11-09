import { NextFunction, Request, Response } from 'express';
import AbstractResponse from '../response/AbstractResponse';

interface RequestHandler {
  (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<AbstractResponse>;
}

export default RequestHandler;
