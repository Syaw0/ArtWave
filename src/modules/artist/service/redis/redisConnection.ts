import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const redisClient = createClient({
  socket: {
    port: 3232,
    host: "localhost",
  },
});

redisClient.on("connect", () => {
  console.log(`[Redis]: Connected to redis server at ${"localhost"}:${3232}`);
});

export { redisClient };
