import { Result } from "../../../../../shared/core/result";
import { UseCaseError } from "../../../../../shared/core/usecaseError";

export namespace RemoveVoteError {
  export class NotFound extends Result<UseCaseError> {
    constructor() {
      super(false, `Error not found the vote`);
    }
  }
}
