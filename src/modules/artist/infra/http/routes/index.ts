import express from "express";
import { checkLoginController } from "../../../usecase/checkLogin";
import { createArtistController } from "../../../usecase/createArtist";

const artistRouter = express.Router();

artistRouter.post("/", (req, res) => createArtistController.execute(req, res));

artistRouter.post("/checkLogin", (req, res) =>
  checkLoginController.execute(req, res)
);

export { artistRouter };
