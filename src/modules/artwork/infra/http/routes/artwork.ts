import express from "express";
import { createArtworkController } from "../../../usecase/artwork/createArtwork";
import { getArtworkByIdController } from "../../../usecase/artwork/getArtworkById";

const artworkRouter = express.Router();

artworkRouter.post("/create", (req, res) =>
  createArtworkController.execute(req, res)
);

artworkRouter.get("/:artworkId", (req, res) =>
  getArtworkByIdController.execute(req, res)
);

export { artworkRouter };
