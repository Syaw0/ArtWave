import { AppError } from "../../../../shared/core/appError";
import { Either, Result } from "../../../../shared/core/result";
import { CheckTokenError } from "./checkTokenError";

export type CheckTokenResponse = Either<
  | CheckTokenError.TokenIsBurned
  | CheckTokenError.TokenIsNotExist
  | CheckTokenError.WrongToken
  | AppError.UnexpectedError
  | Result<any>,
  Result<any>
>;
