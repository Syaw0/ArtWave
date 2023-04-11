import { BaseApi } from "src/shared/infra/services/baseApi";
import { left, Result, right } from "../../../../../../src/shared/core/result";

interface IArtworkService {}

export class ArtworkService extends BaseApi {
  async getLatestArtworks() {
    try {
      const artworks = await this.get("/artwork/latest");
      return right(Result.ok(artworks.data));
    } catch (err) {
      return left(Result.fail(err as string));
    }
  }
  async getPopularArtworks() {
    try {
      const artworks = await this.get("/artwork/top");
      return right(Result.ok(artworks.data));
    } catch (err) {
      return left(Result.fail(err as string));
    }
  }
  async searchArtwork(query: string) {
    try {
      const artworks = await this.get(`/artwork/search?q=${query}`);
      return right(Result.ok(artworks.data));
    } catch (err) {
      return left(Result.fail(err as string));
    }
  }
}
