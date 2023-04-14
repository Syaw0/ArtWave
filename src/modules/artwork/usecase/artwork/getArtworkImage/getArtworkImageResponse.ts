import { AppError } from "../../../../../shared/core/appError";
import { Either, Result } from "../../../../../shared/core/result";

export type GetArtworkImageResponse = Either<
  AppError.UnexpectedError | Result<any>,
  Result<Buffer>
>;
