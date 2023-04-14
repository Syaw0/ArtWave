import { Result } from "../../../../../shared/core/result";
import { UseCaseError } from "../../../../../shared/core/usecaseError";

export namespace RemoveCommentError {
  export class NotFound extends Result<UseCaseError> {
    constructor() {
      super(false, "Not found the comment");
    }
  }
}
