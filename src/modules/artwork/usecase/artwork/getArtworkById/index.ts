import { artworkRepo } from "../../../repo/artworkRepo";
import { GetArtworkByIdController } from "./getArtworkByIdController";
import { GetArtworkByIdUseCase } from "./getArtworkByIdUseCase";

export const getArtworkByIdUseCase = new GetArtworkByIdUseCase(artworkRepo);
export const getArtworkByIdController = new GetArtworkByIdController(
  getArtworkByIdUseCase
);
