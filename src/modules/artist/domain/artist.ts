import { AggregateRoot } from "../../../shared/domain/aggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { ArtistBiography } from "./artistBiography";
import { ArtistEmail } from "./artistEmail";
import { ArtistId } from "./artistId";
import { ArtistName } from "./artistName";
import { ArtistPassword } from "./artistPassword";
import { ArtistProfilePicture } from "./artistProfilePicture";
import { EmailVerificationToken } from "./EmailVerificationToken";

interface ArtistProps {
  ArtistId: ArtistId;
  password: ArtistPassword;
  email: ArtistEmail;
  name: ArtistName;
  biography: ArtistBiography;
  profilePicture: ArtistProfilePicture;
  emailVerificationToken: EmailVerificationToken;
  isEmailVerified?: boolean;
  isLogged: boolean;
}

export class Artist extends AggregateRoot<ArtistProps> {
  private constructor(props: ArtistProps, id?: UniqueEntityID) {
    super(props, id);
  }
}
