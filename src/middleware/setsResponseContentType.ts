import { Request, Response, NextFunction } from 'express';

const handle = (
  _request: Request,
  response: Response,
  next: NextFunction
): void => {
  response.header('Content-Type', 'application/json');
  next();
};

export default handle;
