import { Guard } from "../../../shared/core/guard";
import { Result } from "../../../shared/core/result";
import { ValueObject } from "../../../shared/domain/valueObject";

interface ArtistPasswordProps {
  password: string;
}

export class ArtistPassword extends ValueObject<ArtistPasswordProps> {
  private constructor(props: ArtistPasswordProps) {
    super(props);
  }
  public static create(password: string): Result<ArtistPassword> {
    const propsCheck = Guard.againstNullOrUndefined(password, "password");
    if (propsCheck.isFailure) {
      return Result.fail<ArtistPassword>(propsCheck.getErrorValue());
    }
    return Result.ok<ArtistPassword>(new ArtistPassword({ password }));
  }
  public comparePassword(password: string): boolean {
    return password === this.props.password;
  }
}
