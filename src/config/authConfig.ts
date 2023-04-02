import dotenv from "dotenv";

dotenv.config();

const appSecret = process.env.APP_SECRET;

export const authConfig = {
  secret: appSecret ?? "default",
  tokenExpiryTime: 300,
};
