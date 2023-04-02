import transporter from "./mailTransportaion";
import { ProfileService } from "./profile/profileService";
import { RedisAuthenticationService } from "./redis/redisAuthenticationService";
import { redisClient } from "./redis/redisConnection";
import { RedisEmailVerificationService } from "./redis/redisEmailVerificationService";

const emailVerificationService = new RedisEmailVerificationService(
  redisClient as any,
  transporter
);

const authenticationService = new RedisAuthenticationService(
  redisClient as any
);

const profileService = new ProfileService();

export { emailVerificationService, authenticationService, profileService };
