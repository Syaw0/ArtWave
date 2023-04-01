import { AppError } from "../../../../shared/core/appError";
import { Either, Result } from "../../../../shared/core/result";
import { CheckLoginError } from "./checkLoginError";

export type CheckLoginResponse = Either<
  | CheckLoginError.EmailAndPasswordDoesNotMatch
  | CheckLoginError.NotFoundEmail
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
