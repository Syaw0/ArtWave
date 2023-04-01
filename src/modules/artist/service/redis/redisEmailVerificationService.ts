import { Transporter } from "nodemailer";
import { RedisClientType } from "redis";
import { EmailVerificationService } from "../emailVerificationService";
import { AbstractRedisClient } from "./abstractRedisClient";
import dotEnv from "dotenv";

dotEnv.config();

const CoEmail = process.env.CoEmail;

export class RedisEmailVerificationService
  extends AbstractRedisClient
  implements EmailVerificationService
{
  mailTransporter: Transporter;
  TRY_NUMBER = 3;
  TOKEN_EXPIRE = 60 * 10;
  constructor(redisClient: RedisClientType, mailTransporter: Transporter) {
    super(redisClient);
    this.mailTransporter = mailTransporter;
  }
  public async sendToken(email: string): Promise<any> {
    await this.checkConnection(1);
    const token = this.generateToken(1000, 9999);
    try {
      await this.client.set(email, token);
      await this.client.set(email + "_try", 0);

      await this.client.expire(email, 10);
      await this.client.expire(email + "_try", 10);
    } catch (err) {
      console.log(err);
      return null;
    }
    this.mailTransporter.sendMail({
      from: CoEmail,
      to: email,
      subject: "Two Factor Authentication",
      html: `<p>${token}</p>`, // TODO write template for it
    });
    return true;
  }

  public async checkToken(
    email: string,
    token: string | number
  ): Promise<boolean> {
    await this.checkConnection(1);
    await this.client.incr(email + "_try");
    const savedToken = await this.getOne(email);

    if (token == savedToken) {
      return true;
    }
    return false;
  }

  public async isTokenBurned(email: string): Promise<boolean> {
    await this.checkConnection(1);
    await this.client.incr(email + "_try");
    const tries = await this.getOne(email + "_try");
    if (Number(tries) > this.TRY_NUMBER) {
      return true;
    }
    return false;
  }

  public async isTokenExist(email: string) {
    await this.checkConnection(1);
    const isExist = await this.client.exists(email);
    return !!isExist;
  }

  private generateToken(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
}
