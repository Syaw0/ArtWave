import fs from "fs/promises";
import path from "path";

export interface IProfileService {
  save(artistId: string, buffer: any): Promise<void>;
  retrieve(artistId: string): Promise<Buffer>;
  del(artistId: string): Promise<void>;
  retrieveDefault(): Promise<Buffer>;
}

export class ProfileService {
  basePath = path.join(__dirname, "repo");

  async save(artistId: string, buffer: Buffer): Promise<void> {
    console.log(artistId);
    const profPath = path.join(this.basePath, artistId);
    await fs.writeFile(profPath, buffer);
  }

  async retrieve(artistId: string): Promise<Buffer> {
    const profPath = path.join(this.basePath, artistId ?? "");
    try {
      return await fs.readFile(profPath);
    } catch (err) {
      return await this.retrieveDefault();
    }
  }

  async retrieveDefault(): Promise<Buffer> {
    const defaultProfPath = path.join(this.basePath, "default");
    return await fs.readFile(defaultProfPath);
  }

  async del(artistId: string): Promise<void> {
    const profPath = path.join(this.basePath, artistId);
    console.log(artistId);
    await fs.unlink(profPath);
  }
}
