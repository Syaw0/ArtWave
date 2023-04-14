import { RefreshToken } from "../../domain/jwt";

export interface LogoutDTO {
  artistEmail: string;
  refreshToken: RefreshToken;
}
