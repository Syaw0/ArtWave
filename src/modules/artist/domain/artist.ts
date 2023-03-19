import { Guard } from "../../../shared/core/guard";
import { Result } from "../../../shared/core/result";
import { AggregateRoot } from "../../../shared/domain/aggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { ArtistBiography } from "./artistBiography";
import { ArtistEmail } from "./artistEmail";
import { ArtistId } from "./artistId";
import { ArtistName } from "./artistName";
import { ArtistPassword } from "./artistPassword";
import { ArtistProfilePicture } from "./artistProfilePicture";
import { EmailVerificationToken } from "./EmailVerificationToken";
import { JWTToken, RefreshToken } from "./jwt";

interface ArtistProps {
  ArtistId: ArtistId;
  password: ArtistPassword;
  email: ArtistEmail;
  name: ArtistName;
  biography: ArtistBiography;
  profilePicture: ArtistProfilePicture;

  emailVerificationToken?: EmailVerificationToken;
  isEmailVerified?: boolean;
  isLogged?: boolean;
  accessToken?: JWTToken;
  refreshToken?: RefreshToken;
  lastLogin?: Date;
}

export class Artist extends AggregateRoot<ArtistProps> {
  get artistId(): ArtistId {
    return ArtistId.create(this._id).getValue();
  }

  get name(): ArtistName {
    return this.props.name;
  }

  get biography(): ArtistBiography {
    return this.props.biography;
  }

  get email(): ArtistEmail {
    return this.props.email;
  }

  get password(): ArtistPassword {
    return this.props.password;
  }

  get profilePicture(): ArtistProfilePicture {
    return this.props.profilePicture;
  }
  get EmailVerificationToken(): EmailVerificationToken | undefined {
    return this.props.emailVerificationToken;
  }
  get isLogged(): boolean | undefined {
    return !!this.props.accessToken && !!this.props.refreshToken;
  }
  get isEmailVerified(): boolean | undefined {
    return this.props.isEmailVerified;
  }
  get lastLogin(): Date | undefined {
    return this.props.lastLogin;
  }
  public setAccessToken(token: JWTToken, refreshToken: RefreshToken): void {
    this.props.accessToken = token;
    this.props.refreshToken = refreshToken;
    this.props.lastLogin = new Date();
  }

  private constructor(props: ArtistProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: ArtistProps,
    id?: UniqueEntityID
  ): Result<Artist> {
    const checkEmailNullity = Guard.againstNullOrUndefined(
      props.email,
      "email"
    );
    if (checkEmailNullity.isFailure) {
      return Result.fail<Artist>(checkEmailNullity.getErrorValue());
    }

    const isNewUser = !!id === false;
    const artist = new Artist(
      {
        ...props,
        isEmailVerified: props.isEmailVerified ? props.isEmailVerified : false,
      },
      id
    );
    return Result.ok<Artist>(artist);
  }
}
