import AbstractResponse from './AbstractResponse';

class ResourceResponse extends AbstractResponse {
  public readonly status: number = 200;

  constructor(resource: any) {
    super();
    this.resource = resource;
  }
}

export default ResourceResponse;
