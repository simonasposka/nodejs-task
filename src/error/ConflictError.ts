class ConflictError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor(message: string, stack?: string | undefined) {
    this.name = 'ConflictError';
    this.message = message;
    this.stack = stack;
  }
}

export default ConflictError;
