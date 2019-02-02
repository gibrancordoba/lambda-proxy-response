import { ApiCallback, ApiResponse, IErrorResponseBody } from './interfaces/api-interfaces';
import { ClientErrorStatus, ServerErrorStatus } from './interfaces/http-status-code-numbers';
import {
  BadRequestException,
  ClientErrorException,
  ErrorResult,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  ServerErrorException,
} from './utils/errors';
import { HttpStatusCode } from './utils/http-status-codes';

/**
 * Contains helper methods to generate a HTTP response.
 */
export class ResponseBuilder {
  //  5xx Errors
  public static serverError(code: ServerErrorStatus, error: Error, callback: ApiCallback): void {
    const errorResult: ServerErrorException = new ServerErrorException(code, error);
    ResponseBuilder._returnAs<ServerErrorException>(errorResult, code, callback);
  }

  public static internalServerError(error: Error, callback: ApiCallback): void {
    const errorResult: InternalServerErrorException = new InternalServerErrorException(error);
    ResponseBuilder._returnAs<InternalServerErrorException>(
      errorResult,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      callback,
    );
  }

  // 4xx Client Errors
  public static clientError(code: ClientErrorStatus, error: Error, callback: ApiCallback): void {
    const errorResult: ClientErrorException = new ClientErrorException(code, error);
    ResponseBuilder._returnAs<ClientErrorException>(errorResult, code, callback);
  }

  public static badRequest(code: string, object: string | Error, callback: ApiCallback): void {
    const errorResult: BadRequestException = new BadRequestException(object);
    ResponseBuilder._returnAs<BadRequestException>(errorResult, HttpStatusCode.BAD_REQUEST, callback);
  }

  public static notFound(object: string | Error, callback: ApiCallback): void {
    const errorResult: NotFoundException = new NotFoundException(object);
    ResponseBuilder._returnAs<NotFoundException>(errorResult, HttpStatusCode.NOT_FOUND, callback);
  }

  public static forbidden(code: string, object: string | Error, callback: ApiCallback): void {
    const errorResult: ForbiddenException = new ForbiddenException(object);
    ResponseBuilder._returnAs<ForbiddenException>(errorResult, HttpStatusCode.FORBIDDEN, callback);
  }

  public static ok<T>(result: T, callback: ApiCallback): void {
    ResponseBuilder._returnAs<T>(result, HttpStatusCode.OK, callback);
  }

  private static _returnAs<T>(result: T, statusCode: number, callback: ApiCallback): void {
    const bodyObject: IErrorResponseBody | T =
      result instanceof ErrorResult ? { response: 'error', statusCode, transactionTime: new Date().getTime(), data: result } : result;
      (bodyObject as any).response = 'success';
    const response: ApiResponse = {
      body: JSON.stringify(bodyObject),
      headers: {
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS, PATCH',
        // tslint:disable-next-line:object-literal-sort-keys
        'Access-Control-Allow-Credentials': false,
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Headers':
          'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Authorization',
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
