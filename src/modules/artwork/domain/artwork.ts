import { AggregateRoot } from "../../../shared/domain/aggregateRoot";
import { ArtworkDescription } from "./artworkDescription";
import { ArtworkId } from "./artworkId";

interface ArtworkProps {
  artworkId: ArtworkId;
  description: ArtworkDescription;
}

export class Artwork extends AggregateRoot<ArtworkProps> {
  get artworkId(): ArtworkId {
    return ArtworkId.create(this._id).getValue();
  }
  get description(): ArtworkDescription {
    return this.description;
  }
}
