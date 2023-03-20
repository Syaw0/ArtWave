import { Result } from "../../../../shared/core/result";
import { UseCaseError } from "../../../../shared/core/usecaseError";

export namespace CreateArtistErrors {
  export class EmailAlreadyExist extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `The email ${email} associated for this account already exists`,
      });
    }
  }
}
