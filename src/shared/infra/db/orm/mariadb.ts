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
    const exception =
      where == null
        ? ""
        : `WHERE ${Object.keys(where)
            .map((k) => {
              return ` ${k}="${where[k]}" `;
            })
            .join(" AND ")}`;
    return await (
      await this.connection
    ).query(`
    select * from ${this.database}.${this.table} ${exception}
    `);
  }
  async create(raw: any): Promise<any> {
    const keys = Object.keys(raw).join(",");
    const values = Object.keys(raw)
      .map((k) => "?")
      .join(",");
    return await (
      await this.connection
    ).query(
      `
      insert into ${this.database}.${this.table} (${keys}) Values(${values})
    `,
      Object.values(raw).map((v) => {
        if (v == null) {
          return "";
        }
        return v;
      })
    );
  }
}
