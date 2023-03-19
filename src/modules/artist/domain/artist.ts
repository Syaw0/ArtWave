import { AggregateRoot } from "../../../shared/domain/aggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { ArtistId } from "./artistId";

interface ArtistProps {
  ArtistId: ArtistId;
  password: any;
  email: any;
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
