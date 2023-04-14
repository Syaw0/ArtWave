import { AppError } from "../../../../../shared/core/appError";
import { Either, Result } from "../../../../../shared/core/result";
import { RemoveVoteError } from "./removeVoteError";

export type RemoveVoteResponse = Either<
  AppError.UnexpectedError | Result<any> | RemoveVoteError.NotFound,
  Result<any>
>;
