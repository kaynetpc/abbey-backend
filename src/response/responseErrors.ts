export default class ResponseError {
  message: string;
  status: number;
  static response: ResponseError;

  constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
  }

  static get(error: Error | any, status?: number) {
    let nError = error;
    if (error instanceof Error) {
      nError = error.message;
    } else {
      nError = error as string;
    }
    if (ResponseError.response) {
      ResponseError.response.message = nError as string;
      ResponseError.response.status = status || 500;
      return ResponseError.response;
    }
    ResponseError.response = new ResponseError(nError as string, status || 500);
    return ResponseError.response;
  }
}
