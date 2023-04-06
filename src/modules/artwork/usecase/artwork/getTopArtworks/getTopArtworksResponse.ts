import { AppError } from "../../../../../shared/core/appError";
import { Either, Result } from "../../../../../shared/core/result";
import { Artwork } from "../../../domain/artwork";

export type GetTopArtworksResponse = Either<
  AppError.UnexpectedError | Result<any>,
  Result<Artwork[]>
>;
