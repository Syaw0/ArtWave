import { RedisAuthenticationService } from "../../../../../../src/modules/artist/service/redis/redisAuthenticationService";
import { redisClient } from "../../../../../../src/modules/artist/service/redis/redisConnection";

export class ArtistAuthService extends RedisAuthenticationService {
  public jwtHashName = "activeJWTClient";
  constructor(redisClient: any) {
    super(redisClient);
  }
  isArtistLoggedIn(cookies: any): boolean {
    if (cookies.refresh == null) {
      return false;
    }
    return true;
  }
}

export const artistAuthService = new ArtistAuthService(redisClient);
