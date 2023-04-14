import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { v1Router } from "./api/v1";
import fileUpload from "express-fileupload";
import next from "next";
import accessibilityMiddleware from "./utils/middleware";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = Number(process.env.PORT) || 5000;

const nextApp = next({
  dev,
  hostname,
  port,
  dir: process.cwd() + "/public/app",
});
const handler = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(async () => {
    const origin = {
      origin: "*",
    };
    const app = express();
    app.use(fileUpload());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors(origin));
    app.use(accessibilityMiddleware);

    app.use("/api/v1", v1Router);
    app.get("*", (req, res) => handler(req, res));

    app.listen(port, () => {
      console.log(`[Server]: Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
