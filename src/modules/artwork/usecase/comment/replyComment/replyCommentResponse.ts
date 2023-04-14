import { AppError } from "../../../../../shared/core/appError";
import { Either, Result } from "../../../../../shared/core/result";

export type ReplyCommentResponse = Either<
  AppError.UnexpectedError | Result<any>,
  Result<any>
>;
