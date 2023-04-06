import { AppError } from "../../../../../shared/core/appError";
import { Either, Result } from "../../../../../shared/core/result";
import { Artwork } from "../../../domain/artwork";
import { VoteError } from "./voteError";

export type VoteResponse = Either<
  AppError.UnexpectedError | Result<any> | VoteError.ErrorDuringCreateVote,
  Result<any>
>;
