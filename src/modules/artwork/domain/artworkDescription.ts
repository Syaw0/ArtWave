import { Guard } from "../../../shared/core/guard";
import { Result } from "../../../shared/core/result";
import { ValueObject } from "../../../shared/domain/valueObject";

interface ArtworkDescriptionProps {
  description: string;
}

export class ArtworkDescription extends ValueObject<ArtworkDescriptionProps> {
  private static MAX_LENGTH = 500;
  private constructor(props: ArtworkDescriptionProps) {
    super(props);
  }
  public get description(): string {
    return this.props.description;
  }
  public static create(dec: string = "") {
    const checkDecLength = Guard.againstAtMost(this.MAX_LENGTH, dec);
    if (checkDecLength.isFailure) {
      return Result.fail<ArtworkDescription>(checkDecLength.getErrorValue());
    }

    return Result.ok<ArtworkDescription>(
      new ArtworkDescription({ description: dec })
    );
  }
}
