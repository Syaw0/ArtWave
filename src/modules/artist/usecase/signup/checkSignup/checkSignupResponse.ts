import { AppError } from "../../../../../shared/core/appError";
import { Either, Result } from "../../../../../shared/core/result";
import { CheckSignupError } from "./checkSignupError";

export type CheckSignupResponse = Either<
  CheckSignupError.EmailExist | AppError.UnexpectedError | Result<any>,
  Result<any>
>;
