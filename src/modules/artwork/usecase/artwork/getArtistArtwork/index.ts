import { artworkRepo } from "../../../repo/artworkRepo";
import { GetArtistArtworkController } from "./getArtistArtworkControllert";
import { GetArtistArtworkUseCase } from "./getArtistArtworkUseCase";

export const getArtistArtworkUseCase = new GetArtistArtworkUseCase(artworkRepo);
export const getArtistArtworkController = new GetArtistArtworkController(
  getArtistArtworkUseCase
);
