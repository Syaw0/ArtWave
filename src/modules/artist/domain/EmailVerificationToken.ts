import { generateRandomToken } from "../../../shared/core/generateRandomToken";
import { Result } from "../../../shared/core/result";
import { ValueObject } from "../../../shared/domain/valueObject";

interface EmailVerificationTokenProps {
  token: number;
  expireDate: Date;
  tryNumber: number;
}

export class EmailVerificationToken extends ValueObject<EmailVerificationTokenProps> {
  private static MAX_TRY_NUMBER = 3;
  private static HOUR_EXPIRE = 1;
  private static MIN_VALUE = 10000;
  private static MAX_VALUE = 99999;

  private constructor(props: EmailVerificationTokenProps) {
    super(props);
  }

  get value(): EmailVerificationTokenProps {
    return this.props;
  }

  get token(): number {
    return this.props.token;
  }
  get expiry(): Date {
    return this.expiry;
  }
  get tries(): number {
    return this.props.tryNumber;
  }

  isCodeExpired(): boolean {
    return new Date() > this.expiry;
  }

  isTriesOverFlowed(): boolean {
    return this.tries >= EmailVerificationToken.MAX_TRY_NUMBER;
  }
  isCodeEqual(code: string | number): boolean {
    return this.props.token == code;
  }

  isCodeValid(code: number | string): Result<EmailVerificationToken> {
    if (this.isCodeExpired()) {
      return Result.fail<EmailVerificationToken>("Token is Expired!");
    }
    if (this.isTriesOverFlowed()) {
      return Result.fail<EmailVerificationToken>(
        "Token is Burned because of to many tries!"
      );
    }
    if (!this.isCodeEqual(code)) {
      return Result.fail<EmailVerificationToken>("Token is not the same!");
    }
    return Result.ok<EmailVerificationToken>();
  }

  public static create(): Result<EmailVerificationToken> {
    const token = generateRandomToken(this.MIN_VALUE, this.MAX_VALUE);
    const expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + this.HOUR_EXPIRE);
    return Result.ok<EmailVerificationToken>(
      new EmailVerificationToken({
        expireDate,
        token,
        tryNumber: 0,
      })
    );
  }
}
