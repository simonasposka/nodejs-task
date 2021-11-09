import { Request, Response, NextFunction } from 'express';
import log from '../logger';

const handle = (
  request: Request,
  _response: Response,
  next: NextFunction
): void => {
  const method: string = request.method;
  let message: string = `${method}: ${request.url}`;

  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    message += ` ${JSON.stringify(request.body)}`;
  }

  log.info(message);

  return next();
};

export default handle;
