import { Result } from "../../../../../shared/core/result";
import { UseCaseError } from "../../../../../shared/core/usecaseError";

export namespace CreateArtworkError {
  export class FailedToCreateArtwork extends Result<UseCaseError> {
    constructor(msg: string) {
      super(false, msg);
    }
  }
}
