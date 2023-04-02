import { Result } from "../../../../../shared/core/result";
import { UseCaseError } from "../../../../../shared/core/usecaseError";

export namespace CheckSignupError {
  export class EmailExist extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `The email ${email} is exist.`,
      });
    }
  }
}
