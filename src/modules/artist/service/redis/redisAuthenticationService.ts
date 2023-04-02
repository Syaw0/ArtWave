import { RedisClientType } from "redis";
import { JWTClaims, JWTToken, RefreshToken } from "../../domain/jwt";
import { AuthenticationService } from "../authenticationService";
import { AbstractRedisClient } from "./abstractRedisClient";
import jwt from "jsonwebtoken";
import { authConfig } from "../../../../config/authConfig";
import randToken from "rand-token";
import { Artist } from "../../domain/artist";
import { redisClient } from "./redisConnection";

export class RedisAuthenticationService
  extends AbstractRedisClient
  implements AuthenticationService
{
  public jwtHashName = "activeJWTClient";
  constructor(redisClient: RedisClientType) {
    super(redisClient);
  }

  signJWT(props: JWTClaims): JWTToken {
    const claims: JWTClaims = {
      artistId: props.artistId,
      email: props.email,
    };
    return jwt.sign(claims, authConfig.secret, {
      expiresIn: authConfig.tokenExpiryTime,
    });
  }

  decodeJWT(token: string): JWTClaims {
    return jwt.verify(token, authConfig.secret) as JWTClaims;
  }

  createRefreshToken(): RefreshToken {
    return randToken.uid(256);
  }

  private constructKey(email: string, refreshToken: RefreshToken): string {
    return `refresh-${refreshToken}.${this.jwtHashName}.${email}`;
  }

  async addToken(
    email: string,
    refreshToken: RefreshToken,
    token: JWTToken
  ): Promise<any> {
    await this.checkConnection();
    return this.client.set(this.constructKey(email, refreshToken), token);
  }

  async isRefreshTokenExist(refreshToken: RefreshToken): Promise<boolean> {
    await this.checkConnection();
    const keys = await this.client.keys(`*${refreshToken}*`);
    return keys.length != 0;
  }

  async getEmailFromRefreshToken(refreshToken: RefreshToken): Promise<string> {
    await this.checkConnection();
    const keys = await this.client.keys(`*${refreshToken}*`);
    const isKeyExist = keys.length != 0;

    if (!isKeyExist) {
      throw new Error("Can not found this refresh token in db.");
    }
    const key = keys[0];
    return key.substring(
      key.indexOf(this.jwtHashName) + this.jwtHashName.length + 1
    );
  }

  async saveAuthenticateArtist(artist: Artist): Promise<void> {
    if (artist.isLogged()) {
      await this.checkConnection();
      await this.addToken(
        artist.email.value,
        artist.refreshToken as string,
        artist.accessToken as string
      );
    }
  }

  async deAuthenticateArtist(email: string): Promise<void> {
    await this.clearAllSession(email);
  }

  async clearAllSession(email: string): Promise<any> {
    await this.checkConnection();
    const keys = await this.client.keys(`*${this.jwtHashName}.${email}`);
    return Promise.all(keys.map((key) => this.client.del(key)));
  }

  async isSessionExist(
    email: string,
    refreshToken: RefreshToken
  ): Promise<boolean> {
    const token = await this.getToken(email, refreshToken);
    return !!token;
  }

  async getToken(email: string, refreshToken: RefreshToken): Promise<string> {
    await this.checkConnection();
    return (await this.client.get(
      this.constructKey(email, refreshToken)
    )) as string;
  }

  async clearToken(email: string, refreshToken: RefreshToken): Promise<any> {
    await this.checkConnection();
    return await this.client.del(this.constructKey(email, refreshToken));
  }

  async getTokens(email: string): Promise<string[]> {
    await this.checkConnection();
    return await this.client.keys(`*${this.jwtHashName}.${email}`);
  }

  async countSessions(email: string): Promise<number> {
    await this.checkConnection();
    const keys = await this.client.keys(`*${this.jwtHashName}.${email}`);
    return keys.length;
  }
  async countTokens(): Promise<number> {
    await this.checkConnection();
    const keys = await this.client.keys(`*${this.jwtHashName}*`);
    return keys.length;
  }
}

const func = async () => {
  const x = new RedisAuthenticationService(redisClient as any);

  const email = "siaw0@gmail.com";
  const ss = x.signJWT({ artistId: "111", email });
  const re = x.createRefreshToken();
  // console.log(ss);

  // const dd = x.decodeJWT("ss");
  // console.log(dd);
  // console.log(await x.addToken(email, re, ss));
  // console.log(await x.isRefreshTokenExist(re));
  // console.log(await x.getEmailFromRefreshToken(re));
  // console.log(await x.deAuthenticateArtist(email));
  // console.log(await x.isSessionExist(email, re));
  console.log(await x.clearAllSession(email));
  // process.exit(1);
};
func();
