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
  async like(artistId: string, artworkId: string) {
    try {
      await this.post("/artwork/vote", { artistId, artworkId });
      return right(Result.ok());
    } catch (err) {
      return left(Result.fail(err as string));
    }
  }
  async unlike(artistId: string, artworkId: string) {
    try {
      await this.post("/artwork/removeVote", { artistId, artworkId });
      return right(Result.ok());
    } catch (err) {
      return left(Result.fail(err as string));
    }
  }

  async getArtwork(artworkId: string) {
    try {
      const artwork = await this.get(`/artwork/${artworkId}`);
      console.log(artwork.data);
      return right(Result.ok(artwork.data));
    } catch (err) {
      return left(Result.fail(err as string));
    }
  }

  async comment(artistId: string, artworkId: string, text: string) {
    try {
      await this.post("/comment/add", { artistId, artworkId, text });
      return right(Result.ok());
    } catch (err) {
      return left(Result.fail(err as string));
    }
  }

  async removeComment(commentId: string, artworkId: string) {
    try {
      await this.post("/comment/remove", { commentId, artworkId });
      return right(Result.ok());
    } catch (err) {
      return left(Result.fail(err as string));
    }
  }
}
