import { AppError } from "../../../../shared/core/appError";
import { Either, Result } from "../../../../shared/core/result";

interface SuccessResponse {
  loggedArtistSubscribes: string[];
  unSubscribedArtistSubscribers: string[];
}

export type UnSubscribeResponse = Either<
  AppError.UnexpectedError,
  Result<SuccessResponse>
>;
