import { AppError } from "../../../../shared/core/appError";
import { Either, Result } from "../../../../shared/core/result";
import { Artist } from "../../domain/artist";
import { GetArtistByEmailError } from "./getArtistByEmailError";

export type GetArtistByEmailResponse = Either<
  GetArtistByEmailError.ArtistNotFound | AppError.UnexpectedError | Result<any>,
  Result<Artist>
>;
