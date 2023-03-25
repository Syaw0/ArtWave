import express from "express";
import { createArtistController } from "../../../usecase/createArtist";

const artistRouter = express.Router();

artistRouter.post("/", (req, res) => createArtistController.execute(req, res));

export { artistRouter };
