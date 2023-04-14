import { WatchedList } from "../../../shared/domain/watchedList";
import { Comment } from "./comment";

export class Comments extends WatchedList<Comment> {
  private constructor(initialComments: Comment[]) {
    super(initialComments);
  }
  compareItems(a: Comment, b: Comment): boolean {
    return a.equals(b);
  }
  public static create(initialComments?: Comment[]): Comments {
    return new Comments(initialComments ? initialComments : []);
  }
  public findByCommentId(commentId: string): Comment {
    return this.currentItems.filter(
      (c) => c.commentId.id.toString() === commentId
    )[0];
  }
  public findChildComments(commentId: string): Comment[] {
    return this.currentItems.filter((c) => {
      if (c.parentComment != null) {
        return c.parentComment.id.toString() == commentId;
      }
    });
  }
  public isExistByCommentId(commentId: string): boolean {
    return (
      this.currentItems.filter((c) => c.commentId.id.toString() === commentId)
        .length !== 0
    );
  }
}
