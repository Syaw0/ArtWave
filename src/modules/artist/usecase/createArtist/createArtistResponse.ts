import { AppError } from "../../../../shared/core/appError";
import { Either, Result } from "../../../../shared/core/result";
import { CreateArtistErrors } from "./createArtistError";

export type CreateUserResponse = Either<
  CreateArtistErrors.EmailAlreadyExist | AppError.UnexpectedError | Result<any>,
  Result<void>
>;
