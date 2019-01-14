import { ApiCallback, ApiResponse, IErrorResponseBody } from './interfaces/api-interfaces';
import { ServerErrorStatus } from './interfaces/http-status-code-numbers';
import { ClientErrorException, ErrorResult, NotFoundException, ServerErrorException } from './utils/errors';
import { HttpStatusCode } from './utils/http-status-codes';

/**
 * Contains helper methods to generate a HTTP response.
 */
export class ResponseBuilder {
  // public static badRequest(code: string, description: string, callback: ApiCallback): void {
  //   const errorResult: BadRequestResult = new BadRequestResult(code, description);
  //   ResponseBuilder._returnAs<BadRequestResult>(errorResult, HttpStatusCode.BadRequest, callback);
  // }

  // public static forbidden(code: string, description: string, callback: ApiCallback): void {
  //   const errorResult: ForbiddenResult = new ForbiddenResult(code, description);
  //   ResponseBuilder._returnAs<ForbiddenResult>(errorResult, HttpStatusCode.Forbidden, callback);
  // }

  public static serverError(code: ServerErrorStatus, error: Error, callback: ApiCallback): void {
    // tslint:disable-next-line:no-console
    console.log('serverError method', code, error, callback);
    const errorResult: ServerErrorException = new ServerErrorException(code, 'Internal Server Error...');
    // tslint:disable-next-line:no-console
    console.log('errorResult method', errorResult instanceof ErrorResult, errorResult instanceof ServerErrorException);
    ResponseBuilder._returnAs<ServerErrorException>(errorResult, HttpStatusCode.INTERNAL_SERVER_ERROR, callback);
  }

  // public static internalServerError(error: Error, callback: ApiCallback): void {
  //   const errorResult: InternalServerErrorResult = new InternalServerErrorResult(ErrorCode.GeneralError, 'Sorry...');
  //   ResponseBuilder._returnAs<InternalServerErrorResult>(errorResult, HttpStatusCode.InternalServerError, callback);
  // }

  public static notFound(message: string, callback: ApiCallback): void {
    const errorResult: NotFoundException = new NotFoundException(message);
    // tslint:disable-next-line:no-console
    console.log('errorResult method', errorResult instanceof ErrorResult, errorResult instanceof ClientErrorException);
    ResponseBuilder._returnAs<NotFoundException>(errorResult, HttpStatusCode.NOT_FOUND, callback);
  }

  public static ok<T>(result: T, callback: ApiCallback): void {
    // tslint:disable-next-line:no-console
    console.log('OK method', result, callback);
    ResponseBuilder._returnAs<T>(result, HttpStatusCode.OK, callback);
  }

  private static _returnAs<T>(result: T, statusCode: number, callback: ApiCallback): void {
    const bodyObject: IErrorResponseBody | T =
      result instanceof ErrorResult ? { statusCode, timestamp: new Date().getTime(), error: result } : result;

    // tslint:disable-next-line:no-console
    console.log('bodyObject _returnAs', result, result instanceof ErrorResult, bodyObject);
    const response: ApiResponse = {
      body: JSON.stringify(bodyObject),
      headers: {
        'Access-Control-Allow-Origin': '*', // This is required to make CORS work with AWS API Gateway Proxy Integration.
      },
      statusCode,
      // tslint:disable-next-line:object-literal-sort-keys
      isBase64Encoded: false,
    };

    if (result instanceof ServerErrorException) {
      callback(result);
    }

    callback(undefined, response);
  }
}
