import { Entity } from "../../../shared/domain/entity";
import { CommentText } from "./commentText";

interface CommentProps {
  text: CommentText;
}

export class Comment extends Entity<CommentProps> {
  constructor(props: CommentProps) {
    super(props);
  }
  get text(): CommentText {
    return this.props.text;
  }
}
