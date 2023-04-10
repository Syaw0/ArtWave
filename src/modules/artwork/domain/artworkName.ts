import { Guard } from "../../../shared/core/guard";
import { Result } from "../../../shared/core/result";
import { ValueObject } from "../../../shared/domain/valueObject";

interface ArtworkNameProps {
  text: string;
}

export class ArtworkName extends ValueObject<ArtworkNameProps> {
  static MIN_LENGTH = 3;
  static MAX_LENGTH = 1000;
  private constructor(props: ArtworkNameProps) {
    super(props);
  }

  public static create(props: ArtworkNameProps): Result<ArtworkName> {
    const checkTextNullity = Guard.againstNullOrUndefined(
      props.text,
      "Artwork name"
    );
    if (checkTextNullity.isFailure) {
      return Result.fail<ArtworkName>(checkTextNullity.getErrorValue());
    }

    const checkTextMinLength = Guard.againstAtLeast(
      this.MIN_LENGTH,
      props.text
    );
    const checkTextMaxLength = Guard.againstAtMost(this.MAX_LENGTH, props.text);

    if (checkTextMaxLength.isFailure) {
      return Result.fail<ArtworkName>(checkTextMaxLength.getErrorValue());
    }
    if (checkTextMinLength.isFailure) {
      return Result.fail<ArtworkName>(checkTextMinLength.getErrorValue());
    }

    return Result.ok<ArtworkName>(new ArtworkName(props));
  }
}
