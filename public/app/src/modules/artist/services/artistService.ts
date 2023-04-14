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

  async updateInformation(artistId: string, name: string, biography: string) {
    try {
      await this.patch(`/artist/changeInformation`, {
        name,
        biography,
        artistId,
      });
      return right(Result.ok());
    } catch (err) {
      return left(Result.fail(err as string));
    }
  }

  async logout(artistEmail: string) {
    try {
      await this.post(`/artist/logout`, {
        artistEmail,
      });
      return right(Result.ok());
    } catch (err) {
      return left(Result.fail(err as string));
    }
  }

  async checkLogin(email: string, password: string) {
    try {
      const result = await this.post(`/artist/checkLogin`, {
        email,
        password,
      });
      return right(Result.ok(result.data));
    } catch (err: any) {
      return left(Result.fail({ ...err.response.data, status: false }));
    }
  }

  async checkLoginToken(email: string, token: string) {
    try {
      const result = await this.post(`/artist/checkLoginToken`, {
        email,
        token,
      });
      return right(Result.ok(result.data));
    } catch (err: any) {
      return left(Result.fail({ ...err.response.data, status: false }));
    }
  }

  async checkSignup(email: string, password: string, name: string) {
    try {
      const result = await this.post(`/artist/checkSignup`, {
        email,
        password,
        name,
      });
      return right(Result.ok(result.data));
    } catch (err: any) {
      return left(Result.fail({ ...err.response.data, status: false }));
    }
  }

  async checkSignupToken(
    email: string,
    password: string,
    name: string,
    token: string
  ) {
    try {
      const result = await this.post(`/artist/checkSignupToken`, {
        email,
        token,
        password,
        name,
      });
      return right(Result.ok(result.data));
    } catch (err: any) {
      return left(Result.fail({ ...err.response.data, status: false }));
    }
  }
}
