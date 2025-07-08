export class BaseError extends Error {
  originalError?: Error;

  constructor(message: string, originalError?: Error) {
    super(message);
    this.name = this.constructor.name;
    this.originalError = originalError;

    if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
  }

  get stackMessage(): string {
    const messages: string[] = [this.message];
    let currentError: Error | undefined = this.originalError;
    while (currentError) {
      messages.push(currentError.message);

      if (currentError instanceof BaseError) {
        currentError = currentError.originalError;
      } else {
        break;
      }
    }

    return messages.join(' -> ');
  }
}
