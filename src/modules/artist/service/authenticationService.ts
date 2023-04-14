import { Artist } from "../domain/artist";
import { JWTClaims, JWTToken, RefreshToken } from "../domain/jwt";

export interface AuthenticationService {
  signJWT(props: JWTClaims): JWTToken;
  decodeJWT(token: string): JWTClaims;
  createRefreshToken(): RefreshToken;
  getTokens(email: string): Promise<string[]>;
  saveAuthenticateArtist(artist: Artist): Promise<void>;
  deAuthenticateArtist(email: string): Promise<void>;
  isRefreshTokenExist(refreshToken: RefreshToken): Promise<boolean>;
  getEmailFromRefreshToken(refreshToken: RefreshToken): Promise<string>;
}
