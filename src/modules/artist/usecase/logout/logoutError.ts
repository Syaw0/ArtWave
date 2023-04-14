import { Result } from "../../../../shared/core/result";
import { UseCaseError } from "../../../../shared/core/usecaseError";

export namespace LogoutError {
  export class RefreshTokenIsNotProvided extends Result<UseCaseError> {
    constructor() {
      super(false, "Refresh token is not provided.");
    }
  }
}
