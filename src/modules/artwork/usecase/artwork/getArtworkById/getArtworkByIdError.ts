import { Result } from "../../../../../shared/core/result";
import { UseCaseError } from "../../../../../shared/core/usecaseError";

export namespace GetArtworkByIdError {
  export class ArtworkNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, "Could not found artwork by this id.");
    }
  }
}
