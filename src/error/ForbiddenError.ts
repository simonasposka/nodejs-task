class ForbiddenError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor(message: string, stack?: string | undefined) {
    this.name = 'ForbiddenError';
    this.message = message;
    this.stack = stack;
  }
}

export default ForbiddenError;
