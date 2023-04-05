import express from "express";
import { createArtworkController } from "../../../usecase/artwork/createArtwork";

const artworkRouter = express.Router();

artworkRouter.post("/create", (req, res) =>
  createArtworkController.execute(req, res)
);

export { artworkRouter };
