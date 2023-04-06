import { AppError } from "../../../../../shared/core/appError";
import { Either, Result } from "../../../../../shared/core/result";
import { RemoveCommentError } from "./removeCommentError";

export type RemoveCommentResponse = Either<
  AppError.UnexpectedError | RemoveCommentError.NotFound | Result<any>,
  Result<any>
>;
