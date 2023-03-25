import express from "express";
import { artistRouter } from "../../../../modules/artist/infra/http/routes";

const v1Router = express.Router();

v1Router.get("/", (req, res) => {
  return res.json({ message: "Im Up!" });
});

v1Router.use("/artist", artistRouter);

export { v1Router };
