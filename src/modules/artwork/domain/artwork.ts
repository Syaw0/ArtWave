import { Guard } from "../../../shared/core/guard";
import { Result } from "../../../shared/core/result";
import { AggregateRoot } from "../../../shared/domain/aggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
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
  totalCommentsNum: number;
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

  get totalCommentsNum(): number {
    return this.props.totalCommentsNum;
  }

  public addVote(vote: ArtworkVote): Result<void> {
    this.props.votes.add(vote);
    return Result.ok<void>();
  }

  public removeVote(vote: ArtworkVote): Result<void> {
    this.props.votes.remove(vote);
    return Result.ok<void>();
  }

  static create(props: ArtworkProps, id?: UniqueEntityID): Result<Artwork> {
    const checkNullity = Guard.againstNullOrUndefinedBulk([
      { argument: props.imageSrc, argumentName: "Artwork Image Source" },
      { argument: props.owner, argumentName: "Artwork Owner" },
      { argument: props.description, argumentName: "Artwork Description" },
    ]);

    if (checkNullity.isFailure) {
      return Result.fail<Artwork>(checkNullity.getErrorValue());
    }

    const defaultProps: ArtworkProps = {
      ...props,
      comments: props.comments ? props.comments : Comments.create([]),
      totalCommentsNum: props.totalCommentsNum ? props.totalCommentsNum : 0,
      publishDate: props.publishDate ? props.publishDate : new Date(),
    };
    return Result.ok<Artwork>(new Artwork(defaultProps, id));
  }
}
