import { createTransport } from "nodemailer";
import dotEnv from "dotenv";

dotEnv.config();

const MainTrapUser = process.env.MailTrapUser;
const MailTrapPassword = process.env.MailTrapPassword;

const transporter = createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MainTrapUser,
    pass: MailTrapPassword,
  },
});

export default transporter;
