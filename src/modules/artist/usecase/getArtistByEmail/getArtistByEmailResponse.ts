import { AppError } from "../../../../shared/core/appError";
import { Either, Result } from "../../../../shared/core/result";
import { GetArtistByEmailError } from "./getArtistByEmailError";

export interface IGetArtistByEmailResponse {
  artistId: string;
  email: string;
  name: string;
  biography: string;
  profilePicture: string;
  // lastLogin: Date;
}

export type GetArtistByEmailResponse = Either<
  GetArtistByEmailError.ArtistNotFound | AppError.UnexpectedError | Result<any>,
  Result<IGetArtistByEmailResponse>
>;
