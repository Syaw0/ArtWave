import { Identify } from "./identify";
import { v4 as uuid } from "uuid";
export class UniqueEntityID extends Identify<string | number> {
  constructor(id?: string | number) {
    super(id ? id : uuid());
  }
}
