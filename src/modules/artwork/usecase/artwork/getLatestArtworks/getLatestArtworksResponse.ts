import { AppError } from "../../../../../shared/core/appError";
import { Either, Result } from "../../../../../shared/core/result";
import { Artwork } from "../../../domain/artwork";
import { ArtworkDTO } from "../../../dto/artworkDTO";

export type GetLatestArtworksResponse = Either<
  AppError.UnexpectedError | Result<any>,
  Result<ArtworkDTO[]>
>;
