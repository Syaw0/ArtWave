interface DbConfig {}

export abstract class ORM {
  constructor(
    protected table: string,
    protected database: string,
    protected config: DbConfig
  ) {}
  abstract findOne(): any;
}
