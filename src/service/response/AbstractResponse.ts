abstract class AbstractResponse {
  protected resource: any | undefined;
  public abstract readonly status: number;

  public getBody = (): any | undefined => {
    return this.resource;
  };

  public getHeaders = (): any => {
    return {};
  };
}

export default AbstractResponse;
