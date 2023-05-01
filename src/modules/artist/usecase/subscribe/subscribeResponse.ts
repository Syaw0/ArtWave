import { AppError } from "../../../../shared/core/appError";
import { Either, Result } from "../../../../shared/core/result";

interface SuccessResponse {
  loggedArtistSubscribes: string[];
  subscribedArtistSubscribers: string[];
}

export type SubscribeResponse = Either<
  AppError.UnexpectedError,
  Result<SuccessResponse>
>;
