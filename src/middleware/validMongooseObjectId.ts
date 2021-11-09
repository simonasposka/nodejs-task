import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import ApiError from '../error/ApiError';

const handle = (
  request: Request,
  _response: Response,
  next: NextFunction
): void => {
  const id: string = request.params.id;

  if (!isValidObjectId(id)) {
    return next(ApiError.notFound('Address not found'));
  }

  return next();
};

export default handle;
