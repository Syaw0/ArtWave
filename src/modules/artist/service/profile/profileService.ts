import fs from "fs/promises";
import path from "path";

export interface IProfileService {
  save(email: string, buffer: any): Promise<void>;
  retrieve(email: string): Promise<Buffer>;
  del(email: string): Promise<void>;
  retrieveDefault(): Promise<Buffer>;
}

export class ProfileService {
  basePath = path.join(__dirname, "repo");

  async save(email: string, buffer: Buffer): Promise<void> {
    const profPath = path.join(this.basePath, email);
    await fs.writeFile(profPath, buffer);
  }

  async retrieve(email: string): Promise<Buffer> {
    const profPath = path.join(this.basePath, email ?? "");
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

  async del(email: string): Promise<void> {
    const profPath = path.join(this.basePath, email);
    await fs.unlink(profPath);
  }
}

// const func = async () => {
//   const x = new ProfileService();
//   console.log(x.basePath);
//   console.log(await x.retrieve("siaw@gmail.com"));
//   console.log("default : ", await x.retrieveDefault());
//   await x.del("ss");
// };
// func();
