import { Guard } from "../../../shared/core/guard";
import { Result } from "../../../shared/core/result";
import { ValueObject } from "../../../shared/domain/valueObject";

interface CommentTextProps {
  text: string;
}

export class CommentText extends ValueObject<CommentTextProps> {
  static MIN_LENGTH = 3;
  static MAX_LENGTH = 1000;
  private constructor(props: CommentTextProps) {
    super(props);
  }

  public static create(props: CommentTextProps): Result<CommentText> {
    const checkTextNullity = Guard.againstNullOrUndefined(
      props.text,
      "Comment Text"
    );
    if (checkTextNullity.isFailure) {
      return Result.fail<CommentText>(checkTextNullity.getErrorValue());
    }

    const checkTextMinLength = Guard.againstAtLeast(
      this.MIN_LENGTH,
      props.text
    );
    const checkTextMaxLength = Guard.againstAtMost(this.MAX_LENGTH, props.text);

    if (checkTextMaxLength.isFailure) {
      return Result.fail<CommentText>(checkTextMaxLength.getErrorValue());
    }
    if (checkTextMinLength.isFailure) {
      return Result.fail<CommentText>(checkTextMinLength.getErrorValue());
    }

    return Result.ok<CommentText>(new CommentText(props));
  }
}
