import { DbConfig, FindOneProps } from "./types";

export abstract class ORM {
  constructor(
    protected table: string,
    protected database: string,
    protected config: DbConfig
  ) {}
  abstract findOne({ where }: FindOneProps): Promise<any>;
}
