import { ErrorBase } from './base.error';

export class ValidationError extends ErrorBase {
  constructor(message: string) {
    super(422, message);
  }
}
