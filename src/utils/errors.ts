// tslint:disable max-classes-per-file (Many simple inherited classes.)
export class ErrorResult extends Error {
  private meta: any;
  private timestamp: Date;

  public constructor(public code: number, public object: any) {
    super(object instanceof Error ? object.message : object);
    this.code = code;
    this.timestamp = new Date();
    this.message = object instanceof Error ? object.message : object;
    this.stack = object instanceof Error ? object.stack : undefined;
    if (object instanceof Error) {
      this.meta = JSON.stringify(object, Object.getOwnPropertyNames(object));
    } else {
      this.meta = { message: object };
    }
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, ErrorResult.prototype);
  }
}

(ErrorResult as any).prototype = new Error();


// 4xx Error Exceptions
export class ClientErrorException extends ErrorResult {
  public constructor(public code: number, public message: any) {
    super(code, message);
    this.name = 'ClientErrorException';
    Object.setPrototypeOf(this, ClientErrorException.prototype);
  }
}

export class BadRequestException extends ClientErrorException {
  public constructor(public message: any) {
    super(400, message);
    this.name = 'InternalServerErrorException';
    Object.setPrototypeOf(this, ClientErrorException.prototype);
  }
}

export class ForbiddenException extends ClientErrorException {
  public constructor(public message: string | Error) {
    super(403, message);
  }
}

export class NotFoundException extends ClientErrorException {
  public constructor(public message: any) {
    super(404, message);
    this.name = 'NotFoundErrorException';
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}


// 5xx Error Exceptions
export class ServerErrorException extends ErrorResult {
  public constructor(public code: number, public message: any) {
    super(code, message);
    this.name = 'ClientErrorException';
    Object.setPrototypeOf(this, ServerErrorException.prototype);
  }
}

export class InternalServerErrorException extends ServerErrorException {
  public constructor(public message: Error) {
    super(500, message);
    this.name = 'InternalServerErrorException';
    Object.setPrototypeOf(this, ServerErrorException.prototype);
  }
}

// tslint:enable
