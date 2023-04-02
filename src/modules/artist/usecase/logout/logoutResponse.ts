import { AppError } from "../../../../shared/core/appError";
import { Either, Result } from "../../../../shared/core/result";
import { LogoutError } from "./logoutError";

export type LogoutResponse = Either<
  | LogoutError.RefreshTokenIsNotProvided
  | AppError.UnexpectedError
  | Result<any>,
  Result<any>
>;
