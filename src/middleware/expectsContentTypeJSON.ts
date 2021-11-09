import { Request, Response, NextFunction } from 'express';
import { STATUS_CODES } from 'http';
import ApiError from '../error/ApiError';

const expectedContentType: string = 'application/json';

const handle = (
  request: Request,
  _response: Response,
  next: NextFunction
): void => {
  const contentType: string =
    request.header('Content-Type') || expectedContentType;

  if (contentType !== expectedContentType) {
    next(ApiError.unsuportedMediaType(<string>STATUS_CODES[415]));
    return;
  }

  next();
};

export default handle;
