import fs from "fs/promises";
import path from "path";

interface IArtworkImageService {
  save(artworkId: string, buffer: any): Promise<void>;
  retrieve(artworkId: string): Promise<Buffer>;
  del(artworkId: string): Promise<void>;
  retrieveDefault(): Promise<Buffer>;
}

export class ArtworkImageService implements IArtworkImageService {
  basePath = path.join(__dirname, "repo");

  async save(artworkId: string, buffer: Buffer): Promise<void> {
    const profPath = path.join(this.basePath, artworkId);
    await fs.writeFile(profPath, buffer);
  }

  async retrieve(artworkId: string): Promise<Buffer> {
    const profPath = path.join(this.basePath, artworkId ?? "");
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

  async del(artworkId: string): Promise<void> {
    const profPath = path.join(this.basePath, artworkId);
    await fs.unlink(profPath);
  }
}
