import { Result } from "../../../shared/core/result";
import { Entity } from "../../../shared/domain/entity";
import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";

export class CommentId extends Entity<any> {
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  static create(id?: UniqueEntityID): Result<CommentId> {
    return Result.ok<CommentId>(new CommentId(id));
  }
}
