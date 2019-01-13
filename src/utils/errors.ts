// tslint:disable max-classes-per-file (Many simple inherited classes.)
export abstract class ErrorResult extends Error {
  public constructor(public code: number, public message: string) {
    super(message);
    (Error as any).captureStackTrace(this, ErrorResult);
  }
}

(ErrorResult as any).prototype = new Error();

export class ClientErrorException extends ErrorResult {}

export class BadRequestException extends ClientErrorException {
  public constructor(public message: string) {
    super(400, message);
  }
}

export class ForbiddenException extends ClientErrorException {
  public constructor(public message: string) {
    super(403, message);
  }
}

export class NotFoundException extends ClientErrorException {
  public constructor(public message: string) {
    super(404, message);
  }
}

export class ServerErrorException extends ErrorResult {}

export class InternalServerErrorException extends ServerErrorException {
  public constructor(public message: string) {
    super(500, message);
  }
}

// tslint:enable
