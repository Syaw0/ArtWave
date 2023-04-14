import { artworkImageService } from "../../../service";
import { GetArtworkImageController } from "./getArtworkImageController";
import { GetArtworkImageUseCase } from "./getArtworkImageUseCase";

export const getArtworkImageUseCase = new GetArtworkImageUseCase(
  artworkImageService
);
export const getArtworkImageController = new GetArtworkImageController(
  getArtworkImageUseCase
);
