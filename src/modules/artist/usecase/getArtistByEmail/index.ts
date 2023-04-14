import { artistRepo } from "../../repo/artistRepo";
import { GetArtistByEmailController } from "./getArtistByEmailController";
import { GetArtistByEmailUseCase } from "./getArtistByEmailUseCase";

export const getArtistByEmailUseCase = new GetArtistByEmailUseCase(artistRepo);
export const getArtistByEmailController = new GetArtistByEmailController(
  getArtistByEmailUseCase
);
