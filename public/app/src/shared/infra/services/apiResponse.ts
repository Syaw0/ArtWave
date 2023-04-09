import { Either, Result } from "../../../../../../src/shared/core/result";
import { ApiErrorMessage } from "./apiErrorMessage";

export type ApiResponse<T> = Either<ApiErrorMessage, Result<T>>;
