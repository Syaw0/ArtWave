import { Result } from "../../../../../shared/core/result";
import { UseCaseError } from "../../../../../shared/core/usecaseError";

export namespace VoteError {
  export class ErrorDuringCreateVote extends Result<UseCaseError> {
    constructor(msg: string) {
      super(false, `Error during create Vote:${msg}`);
    }
  }
  export class VoteExist extends Result<UseCaseError> {
    constructor() {
      super(false, "Artist vote is exist");
    }
  }
}
