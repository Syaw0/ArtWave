import { Result } from "../../../../shared/core/result";
import { UseCaseError } from "../../../../shared/core/usecaseError";

export namespace ChangeInformationError {
  export class CharacterLengthError extends Result<UseCaseError> {
    constructor(msg: string) {
      super(false, msg);
    }
  }

  export class ArtistNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, "The Artist With This Email Is Not Found.");
    }
  }
}
