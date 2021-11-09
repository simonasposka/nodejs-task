import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';

const validate =
  (schema: AnySchema) =>
  async (
    request: Request,
    _response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { body, query, params } = await schema.validate({
        body: request.body,
        query: request.query,
        params: request.params,
      });

      request.body = body;
      request.query = query;
      request.params = params;

      return next();
    } catch (e) {
      return next(ApiError.create(e));
    }
  };

export default validate;
