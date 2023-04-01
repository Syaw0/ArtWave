import { RedisClientType } from "redis";

export abstract class AbstractRedisClient {
  private tokenExpiryTime: number = 604800;
  protected client: RedisClientType;

  constructor(client: RedisClientType) {
    this.client = client;
  }

  public async getOne<T>(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  public async set(key: string, value: any): Promise<any> {
    return await this.client.set(key, value);
  }

  public async deleteOne(key: string): Promise<number> {
    return await this.client.del(key);
  }
  protected async checkConnection() {
    if (!this.client.isOpen && !this.client.isReady) {
      await this.client.connect();
    }
  }
}
