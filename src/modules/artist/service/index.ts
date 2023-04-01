import transporter from "./mailTransportaion";
import { redisClient } from "./redis/redisConnection";
import { RedisEmailVerificationService } from "./redis/redisEmailVerificationService";

const emailVerificationService = new RedisEmailVerificationService(
  redisClient as any,
  transporter
);

export { emailVerificationService };
