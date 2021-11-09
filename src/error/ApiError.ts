import { ValidationError } from 'yup';
import ConflictError from './ConflictError';
import ForbiddenError from './ForbiddenError';
import ResourceNotFoundError from './ResourceNotFoundError';

class ApiError {
  public code: number;
  public message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  public static create = (error: any): ApiError => {
    if (error instanceof ValidationError) {
      return ApiError.unprocessableEntity(error.message);
    }

    if (error instanceof ForbiddenError) {
      return ApiError.forbidden(error.message);
    }

    if (error instanceof ResourceNotFoundError) {
      return ApiError.notFound(error.message);
    }

    if (error instanceof ConflictError) {
      return ApiError.conflict(error.message);
    }

    return ApiError.internal(error.message ?? 'Something went wrong');
  };

  public static forbidden = (message: string): ApiError => {
    return new ApiError(403, message);
  };

  public static notFound = (message: string): ApiError => {
    return new ApiError(404, message);
  };

  public static conflict = (message: string): ApiError => {
    return new ApiError(409, message);
  };

  public static unsuportedMediaType = (message: string): ApiError => {
    return new ApiError(415, message);
  };

  public static unprocessableEntity = (message: string): ApiError => {
    return new ApiError(422, message);
  };

  public static internal = (message: string): ApiError => {
    return new ApiError(500, message);
  };
}

export default ApiError;
