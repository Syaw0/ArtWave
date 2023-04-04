import { Guard } from "../../../shared/core/guard";
import { Result } from "../../../shared/core/result";
import { Entity } from "../../../shared/domain/entity";
import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { ArtistId } from "../../artist/domain/artistId";
import { ArtworkId } from "./artworkId";
import { CommentId } from "./commentId";
import { CommentText } from "./commentText";

interface CommentProps {
  commentId: CommentId;
  text: CommentText;
  owner: ArtistId;
  place: ArtworkId;
  parentComment?: CommentId;
  publishDate: Date;
}

export class Comment extends Entity<CommentProps> {
  private constructor(props: CommentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get commentId(): CommentId {
    return CommentId.create(this._id).getValue();
  }

  get text(): CommentText {
    return this.props.text;
  }

  get owner(): ArtistId {
    return this.props.owner;
  }

  get place(): ArtworkId {
    return this.props.place;
  }

  get parentComment(): ArtworkId | undefined {
    return this.props.parentComment;
  }

  get publishDate(): Date {
    return this.props.publishDate;
  }

  static create(props: CommentProps, id?: UniqueEntityID): Result<Comment> {
    const checkNullity = Guard.againstNullOrUndefinedBulk([
      { argument: props.owner, argumentName: "Comment Owner" },
      { argument: props.place, argumentName: "Comment Place" },
      { argument: props.text, argumentName: "Comment Text" },
    ]);

    if (checkNullity.isFailure) {
      return Result.fail<Comment>(checkNullity.getErrorValue());
    }

    return Result.ok<Comment>(
      new Comment(
        {
          ...props,
          publishDate: props.publishDate ? props.publishDate : new Date(),
        },
        id
      )
    );
  }
}
