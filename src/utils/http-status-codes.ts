export const Informational = {
    CONTINUE: 100,
    SWITHCHING_PROTOCOLS: 101,
    // tslint:disable-next-line:object-literal-sort-keys
    PROCESSING: 102
}

export const Success = {
  OK: 200,
  // tslint:disable-next-line:object-literal-sort-keys
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  PARTIAL_CONTENT: 206,
}

export const Redirection = {
  MOVED_PERMANENTLY: 301,
  // tslint:disable-next-line:object-literal-sort-keys
  FOUND: 302,
  SEE_OTHER:303,
  NOT_MODIFY:304
}

export const ClientError = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  // tslint:disable-next-line:object-literal-sort-keys
  FORBIDDEN:403,
  NOT_FOUND:404,
  METHOD_NOT_ALLOWED:405,
  CONFLICT:409,
  GONE:410,
  LENGTH_REQUIRED:411,
  UNSUPORTED_MEDIA_TYPE:415,
  UNPROCESSABLE_ENTITY: 422,
  LOCKED:423,
  PPRECONDITION_REQUIRED:428,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST:499
}

export const ServerError = {
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  // tslint:disable-next-line:object-literal-sort-keys
  BAD_GATEWAY:502,
  SERVICE_UNAVAILABLE:503,
  GATEWAY_TIMEOUT:504,
  LOOP_DETECTED:508,
  NOT_EXTENDED:510,
 
}

export const HttpStatusCode = {
  ...Informational,
  ...Success, 
  // tslint:disable-next-line:object-literal-sort-keys
  ...Redirection,
  ...ClientError,
  ...ServerError 
};

export default HttpStatusCode;
  