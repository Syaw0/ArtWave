import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { Mapper } from "../../../shared/infra/mapper";
import { Comment } from "../domain/comment";

export class ArtworkCommentMapper implements Mapper<Comment> {
  static toDomain(raw: any): Comment | null {
    const comment = Comment.create(
      {
        commentId: raw.artwork_comment_id,
        owner: raw.artwork_owner_id,
        place: raw.artwork_comment_artwork_id,
        publishDate: raw.artwork_comment_publish_date,
        text: raw.artwork_comment_text,
        parentComment: raw.artwork_comment_parent_comment,
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
      artwork_comment_owner_id: comment.owner.id.toString(),
      artwork_comment_artwork_id: comment.place.id.toString(),
      artwork_comment_publish_date: comment.publishDate,
      artwork_comment_text: comment.text.props.text,
      artwork_comment_parent_comment: comment.parentComment?.id.toString(),
    };
  }
}
