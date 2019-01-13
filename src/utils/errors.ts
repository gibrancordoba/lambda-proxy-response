// tslint:disable max-classes-per-file (Many simple inherited classes.)
export abstract class ErrorResult extends Error {
  public constructor(public code: number, public message: string) {
    super(message);
    (Error as any).captureStackTrace(this, ErrorResult);
  }
}

export class ClientErrorException extends ErrorResult {}

export class BadRequestException extends ClientErrorException {
  public constructor(public message: string) {
    super(400, message);
    (Error as any).captureStackTrace(this, BadRequestException);
  }
}

export class ForbiddenException extends ClientErrorException {
  public constructor(public message: string) {
    super(403, message);
    (Error as any).captureStackTrace(this, ForbiddenException);
  }
}

export class NotFoundException extends ClientErrorException {
  public constructor(public message: string) {
    super(404, message);
    (Error as any).captureStackTrace(this, NotFoundException);
  }
}

export class ServerErrorException extends ErrorResult {}

export class InternalServerErrorException extends ServerErrorException {
  public constructor(public message: string) {
    super(500, message);
    (Error as any).captureStackTrace(this, InternalServerErrorException);
  }
}

// tslint:enable
