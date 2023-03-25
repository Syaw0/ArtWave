import { ORM } from "./orm";
import { Connection, createConnection } from "mariadb";
import { DbConfig, FindOneProps } from "./types";

export class Mariadb extends ORM {
  private connection: Promise<Connection>;
  constructor(
    protected table: string,
    protected database: string,
    protected config: DbConfig
  ) {
    super(table, database, config);
    this.connection = createConnection({ ...config });
  }
  async findOne({ where }: FindOneProps): Promise<any> {
    return await (await this.connection).query("");
  }
  async create(raw: any): Promise<any> {
    return await (await this.connection).query("");
  }
}
