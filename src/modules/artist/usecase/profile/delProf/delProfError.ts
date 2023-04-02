import { Result } from "../../../../../shared/core/result";
import { UseCaseError } from "../../../../../shared/core/usecaseError";

export namespace DelProfError {
  export class ProfNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, "Profile could not founded.");
    }
  }
}
