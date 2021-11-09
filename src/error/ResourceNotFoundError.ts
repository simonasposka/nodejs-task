class ResourceNotFoundError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor(message: string, stack?: string | undefined) {
    this.name = 'ResourceNotFoundError';
    this.message = message;
    this.stack = stack;
  }
}

export default ResourceNotFoundError;
