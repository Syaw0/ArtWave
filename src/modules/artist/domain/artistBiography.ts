import { Guard } from "../../../shared/core/guard";
import { Result } from "../../../shared/core/result";
import { ValueObject } from "../../../shared/domain/valueObject";
interface ArtistBiographyProps {
  biography: string;
}
export class ArtistBiography extends ValueObject<ArtistBiographyProps> {
  private static MAX_CHARACTER = 120;
  private constructor(props: ArtistBiographyProps) {
    super(props);
  }
  public static create(biography: string): Result<ArtistBiography> {
    const checkBioNullity = Guard.againstNullOrUndefined(
      biography,
      "biography"
    );
    if (checkBioNullity.isFailure) {
      return Result.fail<ArtistBiography>(checkBioNullity.getErrorValue());
    }
    const checkBioLength = Guard.againstAtMost(this.MAX_CHARACTER, biography);
    if (checkBioLength.isFailure) {
      return Result.fail<ArtistBiography>(checkBioLength.getErrorValue());
    }
    return Result.ok<ArtistBiography>(
      new ArtistBiography({ biography: biography })
    );
  }
}
