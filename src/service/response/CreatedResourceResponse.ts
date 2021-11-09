import AbstractResponse from './AbstractResponse';

class CreatedResourceResponse extends AbstractResponse {
  public readonly status: number = 201;
  private resourceUrl: string;

  constructor(resource: any, resourceUrl: string) {
    super();

    this.resource = resource;
    this.resourceUrl = resourceUrl;
  }

  public override getHeaders = (): any => {
    return {
      Location: `${process.env.BASE_URL}${this.resourceUrl}`,
    };
  };
}

export default CreatedResourceResponse;
