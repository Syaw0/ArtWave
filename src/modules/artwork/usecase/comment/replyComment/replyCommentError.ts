import { Result } from "../../../../../shared/core/result";
import { UseCaseError } from "../../../../../shared/core/usecaseError";

export namespace ReplyCommentError {
  export class ParentCommentNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, "Not found the comment");
    }
  }
}
