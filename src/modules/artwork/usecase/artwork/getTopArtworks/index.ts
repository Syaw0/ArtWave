import { artworkRepo } from "../../../repo/artworkRepo";
import { GetTopArtworksController } from "./getTopArtworkController";
import { GetTopArtworksUseCase } from "./getTopArtworksUseCase";

export const getTopArtworksUseCase = new GetTopArtworksUseCase(artworkRepo);
export const getTopArtworkController = new GetTopArtworksController(
  getTopArtworksUseCase
);
