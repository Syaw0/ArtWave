import { AppError } from "../../../../shared/core/appError";
import { Either, Result } from "../../../../shared/core/result";
import { ChangeInformationError } from "./chageInfomationError";

export type ChangeInformationResponse = Either<
  | ChangeInformationError.CharacterLengthError
  | AppError.UnexpectedError
  | Result<any>,
  Result<any>
>;
