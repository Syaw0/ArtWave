import { AppError } from "../../../../shared/core/appError";
import { Either, Result } from "../../../../shared/core/result";

export interface UnSubscribeSuccessResponse {
  loggedArtistSubscribes: string[];
  unSubscribedArtistSubscribers: string[];
}

export type UnSubscribeResponse = Either<
  AppError.UnexpectedError,
  Result<UnSubscribeSuccessResponse>
>;
