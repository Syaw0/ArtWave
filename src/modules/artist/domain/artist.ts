import { AggregateRoot } from "../../../shared/domain/aggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { ArtistBiography } from "./artistBiography";
import { ArtistEmail } from "./artistEmail";
import { ArtistId } from "./artistId";
import { ArtistName } from "./artistName";
import { ArtistPassword } from "./artistPassword";
import { ArtistProfilePicture } from "./artistProfilePicture";

interface ArtistProps {
  ArtistId: ArtistId;
  password: ArtistPassword;
  email: ArtistEmail;
  name: ArtistName;
  biography: ArtistBiography;
  profilePicture: ArtistProfilePicture;
  isEmailVerified?: boolean;
  isLogged: boolean;
}

export class Artist extends AggregateRoot<ArtistProps> {
  private constructor(props: ArtistProps, id?: UniqueEntityID) {
    super(props, id);
  }
}
