import { Result } from "../../../shared/core/result";
import { Entity } from "../../../shared/domain/entity";
import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";

export class ArtworkId extends Entity<any> {
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }
  get id(): UniqueEntityID {
    return this._id;
  }

  public static create(id?: UniqueEntityID): Result<ArtworkId> {
    return Result.ok<ArtworkId>(new ArtworkId(id));
  }
}
