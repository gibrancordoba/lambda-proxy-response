import { 
  ApiCallback, 
  ApiResponse, 
  IErrorResponseBody 
} from '../interfaces/api-interfaces';

import { 
  // BadRequestException, 
  ErrorResult, 
  // ForbiddenException, 
  // InternalServerErrorException,
  // NotFoundException, 
  ServerErrorException 
} from '../error/errors';
import { ServerErrorStatus } from '../interfaces/http-status-code-numbers';
import { HttpStatusCode } from './http-status-codes';

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
    const errorResult: ServerErrorException = new ServerErrorException(code,'Internal Error...');
    ResponseBuilder._returnAs<ServerErrorException>(errorResult, HttpStatusCode.INTERNAL_SERVER_ERROR, callback);
  }

  // public static internalServerError(error: Error, callback: ApiCallback): void {
  //   const errorResult: InternalServerErrorResult = new InternalServerErrorResult(ErrorCode.GeneralError, 'Sorry...');
  //   ResponseBuilder._returnAs<InternalServerErrorResult>(errorResult, HttpStatusCode.InternalServerError, callback);
  // }

  // public static notFound(code: string, description: string, callback: ApiCallback): void {
  //   const errorResult: NotFoundResult = new NotFoundResult(code, description);
  //   ResponseBuilder._returnAs<NotFoundResult>(errorResult, HttpStatusCode.NotFound, callback);
  // }

  public static ok<T>(result: T, callback: ApiCallback): void {
    ResponseBuilder._returnAs<T>(result, HttpStatusCode.OK, callback);
  }

  private static _returnAs<T>(result: T, statusCode: number, callback: ApiCallback): void {
    const bodyObject: IErrorResponseBody | T = result instanceof ErrorResult
      ? { statusCode: result.code, error: result }
      : result;
    const response: ApiResponse = {
      body: JSON.stringify(bodyObject),
      headers: {
        'Access-Control-Allow-Origin': '*'  // This is required to make CORS work with AWS API Gateway Proxy Integration.
      },
      statusCode,
      // tslint:disable-next-line:object-literal-sort-keys
      isBase64Encoded: false
    };

    callback(undefined, response);
  }
}
