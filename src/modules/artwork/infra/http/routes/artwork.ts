import express from "express";
import { createArtworkController } from "../../../usecase/artwork/createArtwork";
import { getArtworkByIdController } from "../../../usecase/artwork/getArtworkById";
import { getArtworkImageController } from "../../../usecase/artwork/getArtworkImage";

const artworkRouter = express.Router();

artworkRouter.post("/create", (req, res) =>
  createArtworkController.execute(req, res)
);

artworkRouter.get("/:artworkId", (req, res) =>
  getArtworkByIdController.execute(req, res)
);

artworkRouter.get("/image/:artworkId", (req, res) =>
  getArtworkImageController.execute(req, res)
);

export { artworkRouter };
