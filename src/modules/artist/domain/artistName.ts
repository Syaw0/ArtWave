import { Guard } from "../../../shared/core/guard";
import { Result } from "../../../shared/core/result";
import { ValueObject } from "../../../shared/domain/valueObject";
interface ArtistNameProps {
  name: string;
}
export class ArtistName extends ValueObject<ArtistNameProps> {
  private static MAX_CHARACTER = 40;
  private constructor(props: ArtistNameProps) {
    super(props);
  }
  public static create(name: string = ""): Result<ArtistName> {
    const checkNameNullity = Guard.againstNullOrUndefined(name, "name");
    if (checkNameNullity.isFailure) {
      return Result.fail<ArtistName>(checkNameNullity.getErrorValue());
    }
    const checkNameLength = Guard.againstAtMost(this.MAX_CHARACTER, name);
    if (checkNameLength.isFailure) {
      return Result.fail<ArtistName>(checkNameLength.getErrorValue());
    }
    return Result.ok<ArtistName>(new ArtistName({ name }));
  }
}
