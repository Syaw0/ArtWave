import { artworkRepo } from "../../../repo/artworkRepo";
import { SearchArtworksController } from "./searchArtworkController";
import { SearchArtworksUseCase } from "./searchArtworksUseCase";

export const searchArtworksUseCase = new SearchArtworksUseCase(artworkRepo);
export const searchArtworkController = new SearchArtworksController(
  searchArtworksUseCase
);
