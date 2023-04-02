import { RefreshToken } from "../../domain/jwt";

export interface LogoutDTO {
  email: string;
  refreshToken: RefreshToken;
}
