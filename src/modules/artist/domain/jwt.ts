export interface JWTClaims {
  artistId: string;
  email: string;
}

export type JWTToken = string;

export type SessionId = string;

export type RefreshToken = string;
