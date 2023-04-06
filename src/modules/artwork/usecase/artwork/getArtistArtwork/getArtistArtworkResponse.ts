import { AppError } from "../../../../../shared/core/appError";
import { Either, Result } from "../../../../../shared/core/result";
import { Artwork } from "../../../domain/artwork";

export type GetArtistArtworkResponse = Either<
  Result<any> | AppError.UnexpectedError,
  Result<Artwork[]>
>;
