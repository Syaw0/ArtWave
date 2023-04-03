import { Result } from "../../../../shared/core/result";
import { UseCaseError } from "../../../../shared/core/usecaseError";

export namespace GetArtistByEmailError {
  export class ArtistNotFound extends Result<UseCaseError> {
    constructor() {
      super(false, "Artist with this email not found.");
    }
  }
}
