import AbstractResponse from './AbstractResponse';

class DeletedResourceResponse extends AbstractResponse {
  public readonly status: number = 204;
}

export default DeletedResourceResponse;
