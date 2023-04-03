import { Result } from "../../../shared/core/result";
import { AggregateRoot } from "../../../shared/domain/aggregateRoot";
import { ArtistId } from "../../artist/domain/artistId";
import { ArtworkDescription } from "./artworkDescription";
import { ArtworkId } from "./artworkId";
import { ArtworkVote } from "./artworkVote";
import { ArtworkVotes } from "./artworkVotes";
import { Comments } from "./comments";

interface ArtworkProps {
  artworkId: ArtworkId;
  description: ArtworkDescription;
  owner: ArtistId;
  publishDate: Date;
  imageSrc: string;
  votes: ArtworkVotes;
  comments: Comments;
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
  get Votes(): ArtworkVotes {
    return this.props.votes;
  }

  get comments(): Comments {
    return this.props.comments;
  }

  public addVote(vote: ArtworkVote): Result<void> {
    this.props.votes.add(vote);
    return Result.ok<void>();
  }

  public removeVote(vote: ArtworkVote): Result<void> {
    this.props.votes.remove(vote);
    return Result.ok<void>();
  }
}
