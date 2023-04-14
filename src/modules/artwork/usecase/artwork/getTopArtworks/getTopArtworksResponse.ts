import { AppError } from "../../../../../shared/core/appError";
import { Either, Result } from "../../../../../shared/core/result";
import { ArtworkDTO } from "../../../dto/artworkDTO";

export type GetTopArtworksResponse = Either<
  AppError.UnexpectedError | Result<any>,
  Result<ArtworkDTO[]>
>;
