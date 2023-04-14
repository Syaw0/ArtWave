import { UniqueEntityID } from "./uniqueEntityID";

const isEntity = (instance: any) => instance instanceof Entity;

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;
  public readonly props: T;
  constructor(props: T, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  equals(object?: Entity<T>): boolean {
    if (object == null) {
      return false;
    }
    if (this === object) {
      return true;
    }
    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
