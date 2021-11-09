import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';
import log from '../logger';

const handle = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error instanceof ApiError) {
    return response.status(error.code).json({
      code: error.code,
      message: error.message,
    });
  }

  log.error(error);

  return response.status(500).json({
    code: 500,
    message: 'something went wrong',
  });
};

export default handle;
