import { ErrorType, IResponseData } from './types';

const getErrorType = ({ desc }: IResponseData<undefined>) => {
  const lowerDesc = desc.toLowerCase();
  switch (true) {
    case lowerDesc.startsWith('Invalid Purse '.toLowerCase()):
      return ErrorType.InvalidPurse;
    case /Only ([a-z]{,10}) cards/i.test(lowerDesc):
      return ErrorType.InvalidCard;
    // TODO: check it
    case lowerDesc.startsWith('Balance to low'.toLowerCase()):
      return ErrorType.BalanceToLow;
    case lowerDesc.startsWith('Слишком частые запросы к API'.toLowerCase()):
      return ErrorType.CoolDown;
    case lowerDesc.startsWith('Адрес можно продлить не ранее, чем через 24 часа с момента резерва'.toLowerCase()):
      return ErrorType.Wait24Hour;

    // TODO: add other errors

    default:
      return ErrorType.Unknown;
  }
};

export class ResponseError extends Error {
  name = this.constructor.name;

  public readonly type: ErrorType;

  constructor(readonly body: IResponseData<any>) {
    super();
    this.message = body.desc;
    this.type = getErrorType(body);
  }

  get [Symbol.toStringTag](): string {
    return `[Error ${this.name}; type=${this.type}] ${this.message}`;
  }

  toJSON(): Error & { type: ErrorType } {
    return {
      message: this.message,
      name: this.name,
      type: this.type,
      stack: this.stack,
    };
  }
}
