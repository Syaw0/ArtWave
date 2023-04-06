import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { Mapper } from "../../../shared/infra/mapper";
import { ArtistId } from "../../artist/domain/artistId";
import { ArtworkId } from "../domain/artworkId";
import { Comment } from "../domain/comment";
import { CommentId } from "../domain/commentId";
import { CommentText } from "../domain/commentText";

export class ArtworkCommentMapper implements Mapper<Comment> {
  static toDomain(raw: any): Comment | null {
    const comment = Comment.create(
      {
        owner: ArtistId.create(
          new UniqueEntityID(raw.artwork_artist_id)
        ).getValue(),
        place: ArtworkId.create(
          new UniqueEntityID(raw.artwork_comment_artwork_id)
        ).getValue(),
        publishDate: raw.artwork_comment_publish_date,
        text: CommentText.create({ text: raw.artwork_comment_text }).getValue(),
        parentComment: raw.artwork_comment_parent_comment
          ? CommentId.create(
              new UniqueEntityID(raw.artwork_comment_parent_comment)
            ).getValue()
          : undefined,
      },
      new UniqueEntityID(raw.artwork_comment_id)
    );

    if (comment.isFailure) {
      console.error(comment.getErrorValue());
      return null;
    }
    return comment.getValue();
  }
  static toPersistence(comment: Comment): any {
    return {
      artwork_comment_id: comment.commentId.id.toString(),
      artwork_comment_artist_id: comment.owner.id.toString(),
      artwork_comment_artwork_id: comment.place.id.toString(),
      artwork_comment_publish_date: comment.publishDate,
      artwork_comment_text: comment.text.props.text,
      artwork_comment_parent_comment: comment.parentComment?.id.toString(),
    };
  }
}
