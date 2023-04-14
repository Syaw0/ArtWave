import { AppError } from "../../../../../shared/core/appError";
import { Either, Result } from "../../../../../shared/core/result";

export type AddCommentResponse = Either<
  AppError.UnexpectedError | Result<any>,
  Result<any>
>;
