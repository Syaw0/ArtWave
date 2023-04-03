import { AggregateRoot } from "../../../shared/domain/aggregateRoot";
import { ArtistId } from "../../artist/domain/artistId";
import { ArtworkDescription } from "./artworkDescription";
import { ArtworkId } from "./artworkId";

interface ArtworkProps {
  artworkId: ArtworkId;
  description: ArtworkDescription;
  owner: ArtistId;
  publishDate: Date;
  imageSrc: string;
}

export class Artwork extends AggregateRoot<ArtworkProps> {
  get artworkId(): ArtworkId {
    return ArtworkId.create(this._id).getValue();
  }
  get description(): ArtworkDescription {
    return this.props.description;
  }
  get owner(): ArtistId {
    return this.props.owner;
  }
  get publishDate(): Date {
    return this.props.publishDate;
  }
  get imageSrc(): string {
    return this.props.imageSrc;
  }
}
