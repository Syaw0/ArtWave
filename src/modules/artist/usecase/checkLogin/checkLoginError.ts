import { Result } from "../../../../shared/core/result";
import { UseCaseError } from "../../../../shared/core/usecaseError";

export namespace CheckLoginError {
  export class NotFoundEmail extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `The email ${email} is not exist.`,
      });
    }
  }

  export class EmailAndPasswordDoesNotMatch extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `The email and the password does not match.`,
      });
    }
  }
}
