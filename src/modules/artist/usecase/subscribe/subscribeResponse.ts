import { AppError } from "../../../../shared/core/appError";
import { Either, Result } from "../../../../shared/core/result";

export interface SubscribeSuccessResponse {
  loggedArtistSubscribes: string[];
  subscribedArtistSubscribers: string[];
}

export type SubscribeResponse = Either<
  AppError.UnexpectedError,
  Result<SubscribeSuccessResponse>
>;
