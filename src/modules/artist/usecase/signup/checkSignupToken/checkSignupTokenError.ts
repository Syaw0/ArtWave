import { Result } from "../../../../../shared/core/result";
import { UseCaseError } from "../../../../../shared/core/usecaseError";

export namespace CheckTokenError {
  export class WrongToken extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Token is Wrong.`,
      });
    }
  }

  export class TokenIsNotExist extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Token is removed.`,
      });
    }
  }

  export class TokenIsBurned extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Token is Burned.`,
      });
    }
  }
}
