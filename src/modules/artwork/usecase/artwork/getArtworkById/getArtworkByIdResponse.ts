import { AppError } from "../../../../../shared/core/appError";
import { Either, Result } from "../../../../../shared/core/result";
import { Artwork } from "../../../domain/artwork";
import { GetArtworkByIdError } from "./getArtworkByIdError";

export type GetArtworkByIdResponse = Either<
  AppError.UnexpectedError | GetArtworkByIdError.ArtworkNotFound | Result<any>,
  Result<Artwork>
>;
