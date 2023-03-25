import { artistRepo } from "../../repo/artistRepo";
import { CreateArtistController } from "./createArtistController";
import { CreateArtistUseCase } from "./createArtistUseCase";

const createArtistUseCase = new CreateArtistUseCase(artistRepo);
const createArtistController = new CreateArtistController(createArtistUseCase);

export { createArtistController, createArtistUseCase };
