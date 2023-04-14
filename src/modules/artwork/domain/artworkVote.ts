import { Guard } from "../../../shared/core/guard";
import { Result } from "../../../shared/core/result";
import { Entity } from "../../../shared/domain/entity";
import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { ArtistId } from "../../artist/domain/artistId";
import { ArtworkId } from "./artworkId";

interface ArtworkVoteProps {
  artworkId: ArtworkId;
  artistId: ArtistId;
}

export class ArtworkVote extends Entity<ArtworkVoteProps> {
  private constructor(props: ArtworkVoteProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get artworkId(): ArtworkId {
    return this.props.artworkId;
  }

  get artistId(): ArtistId {
    return this.props.artistId;
  }

  public static create(
    props: ArtworkVoteProps,
    id?: UniqueEntityID
  ): Result<ArtworkVote> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.artistId, argumentName: "Artist ID" },
      { argument: props.artworkId, argumentName: "Artwork ID" },
    ]);
    if (guardResult.isFailure) {
      return Result.fail<ArtworkVote>(guardResult.getErrorValue());
    } else {
      return Result.ok<ArtworkVote>(new ArtworkVote(props, id));
    }
  }
}
