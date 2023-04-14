import { Result } from "../../../shared/core/result";
import { Entity } from "../../../shared/domain/entity";
import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";

export class ArtistId extends Entity<any> {
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  public static create(id?: UniqueEntityID): Result<ArtistId> {
    return Result.ok<ArtistId>(new ArtistId(id));
  }
}
