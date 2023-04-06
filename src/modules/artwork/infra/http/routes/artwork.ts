import express from "express";
import { createArtworkController } from "../../../usecase/artwork/createArtwork";
import { getArtistArtworkController } from "../../../usecase/artwork/getArtistArtwork";
import { getArtworkByIdController } from "../../../usecase/artwork/getArtworkById";
import { getArtworkImageController } from "../../../usecase/artwork/getArtworkImage";
import { getLatestArtworkController } from "../../../usecase/artwork/getLatestArtworks";
import { getTopArtworkController } from "../../../usecase/artwork/getTopArtworks";
import { removeVoteController } from "../../../usecase/artwork/removeVote";
import { voteController } from "../../../usecase/artwork/vote";

const artworkRouter = express.Router();

artworkRouter.post("/create", (req, res) =>
  createArtworkController.execute(req, res)
);

artworkRouter.get("/latest", (req, res) =>
  getLatestArtworkController.execute(req, res)
);

artworkRouter.get("/top", (req, res) =>
  getTopArtworkController.execute(req, res)
);

artworkRouter.get("/image/:artworkId", (req, res) =>
  getArtworkImageController.execute(req, res)
);

artworkRouter.get("/artist/:artistId", (req, res) =>
  getArtistArtworkController.execute(req, res)
);

artworkRouter.post("/vote", (req, res) => voteController.execute(req, res));

artworkRouter.post("/removeVote", (req, res) =>
  removeVoteController.execute(req, res)
);

artworkRouter.get("/:artworkId", (req, res) =>
  getArtworkByIdController.execute(req, res)
);

export { artworkRouter };
