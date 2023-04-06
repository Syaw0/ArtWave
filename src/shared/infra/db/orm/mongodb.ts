import { ORM } from "./orm";
import { FindOneProps } from "./types";
import { MongoClient } from "mongodb";

export class Mongodb extends ORM {
  private client: MongoClient;
  constructor(
    protected table: string,
    protected database: string,
    protected config: any
  ) {
    super(table, database, config);
    this.client = new MongoClient(
      config.url ? config.url : "mongodb://localhost:3131/"
    );
  }
  async findOne({ where }: FindOneProps): Promise<any> {
    const db = this.client.db(this.database);
    const col = db.collection(this.table);
    const list: any = [];
    const cursor = col.find(where ? where : {});
    await cursor.forEach((c) => list.push(c));
    return list;
  }
  async create(raw: any): Promise<any> {
    const db = this.client.db(this.database);
    const col = db.collection(this.table);
    await col.insertOne(raw);
  }
  async update(raw: any, { where }: FindOneProps): Promise<any> {
    const db = this.client.db(this.database);
    const col = db.collection(this.table);
    await col.updateOne(where ? where : {}, { $set: raw });
  }
}
