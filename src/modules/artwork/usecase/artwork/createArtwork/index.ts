import { artworkRepo } from "../../../repo/artworkRepo";
import { artworkImageService } from "../../../service";
import { CreateArtworkController } from "./createArtworkController";
import { CreateArtworkUseCase } from "./createArtworkUseCase";

export const createArtworkUseCase = new CreateArtworkUseCase(
  artworkRepo,
  artworkImageService
);
export const createArtworkController = new CreateArtworkController(
  createArtworkUseCase
);
