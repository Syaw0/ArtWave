import { AggregateRoot } from "../../../shared/domain/aggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { ArtistEmail } from "./artistEmail";
import { ArtistId } from "./artistId";
import { ArtistPassword } from "./artistPassword";

interface ArtistProps {
  ArtistId: ArtistId;
  password: ArtistPassword;
  email: ArtistEmail;
  isLogged: boolean;
  name: any;
  biography: any;
  profilePicture: any;
}

export class Artist extends AggregateRoot<ArtistProps> {
  private constructor(props: ArtistProps, id?: UniqueEntityID) {
    super(props, id);
  }
}
