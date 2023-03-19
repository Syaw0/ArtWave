import { Guard } from "../../../shared/core/guard";
import { Result } from "../../../shared/core/result";
import { ValueObject } from "../../../shared/domain/valueObject";

interface ArtistEmailProps {
  email: string;
}

export class ArtistEmail extends ValueObject<ArtistEmailProps> {
  private constructor(props: ArtistEmailProps) {
    super(props);
  }

  get value(): string {
    return this.props.email;
  }

  private static isValidEmail(email: string) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: string): Result<ArtistEmail> {
    const checkEmailNullity = Guard.againstNullOrUndefined(email, "email");
    if (checkEmailNullity.isFailure) {
      return Result.fail<ArtistEmail>(checkEmailNullity.getErrorValue());
    }
    if (!this.isValidEmail(email)) {
      return Result.fail<ArtistEmail>("The email is not Valid!");
    }
    return Result.ok<ArtistEmail>(
      new ArtistEmail({ email: this.format(email) })
    );
  }
}
