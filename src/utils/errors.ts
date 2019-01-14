// tslint:disable max-classes-per-file (Many simple inherited classes.)
export class ErrorResult extends Error {
  public constructor(public code: number, public message: string) {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, ErrorResult.prototype);
  }
}

(ErrorResult as any).prototype = new Error();

export class ClientErrorException extends ErrorResult {
  public constructor(public code: number, public message: string) {
    super(code, message);
    this.name = 'ClientErrorException';
    Object.setPrototypeOf(this, ClientErrorException.prototype);
  }
}

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
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

export class ServerErrorException extends ErrorResult {
  public constructor(public code: number, public message: string) {
    super(code, message);
    this.name = 'ClientErrorException';
    Object.setPrototypeOf(this, ServerErrorException.prototype);
  }
}

export class InternalServerErrorException extends ServerErrorException {
  public constructor(public message: string) {
    super(500, message);
  }
}

// tslint:enable
