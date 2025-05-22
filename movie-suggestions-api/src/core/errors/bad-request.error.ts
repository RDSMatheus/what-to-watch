import { ErrorBase } from "./base.error";

class BadRequestError extends ErrorBase {
  constructor(message: string) {
    super(400, message);
  }
}

export default BadRequestError;
