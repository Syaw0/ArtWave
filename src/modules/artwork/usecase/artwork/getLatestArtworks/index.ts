import { artworkRepo } from "../../../repo/artworkRepo";
import { GetLatestArtworksController } from "./getLatestArtworkController";
import { GetLatestArtworksUseCase } from "./getLatestArtworksUseCase";

export const getLatestArtworksUseCase = new GetLatestArtworksUseCase(
  artworkRepo
);
export const getLatestArtworkController = new GetLatestArtworksController(
  getLatestArtworksUseCase
);
