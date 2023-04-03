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
}
