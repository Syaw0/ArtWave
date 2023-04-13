import { BaseApi } from "src/shared/infra/services/baseApi";
import { Result, left, right } from "../../../../../../src/shared/core/result";

export class ArtistService extends BaseApi {
  async updateProfileImage(image: File, artistId: string) {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("artistId", artistId);
      await this.patch("/artist/changeProf", formData);
      return right(Result.ok());
    } catch (err) {
      return left(Result.fail(err as string));
    }
  }

  async removeProfileImage(artistId: string) {
    try {
      await this.del(`/artist/delProf?artistId=${artistId}`);
      return right(Result.ok());
    } catch (err) {
      return left(Result.fail(err as string));
    }
  }
}