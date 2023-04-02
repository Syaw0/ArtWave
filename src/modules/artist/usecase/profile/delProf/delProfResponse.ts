import { AppError } from "../../../../../shared/core/appError";
import { Either, Result } from "../../../../../shared/core/result";
import { DelProfError } from "./delProfError";

export type DelProfResponse = Either<
  DelProfError.ProfNotFound | AppError.UnexpectedError | Result<any>,
  Result<any>
>;
