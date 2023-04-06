import { artworkRepo } from "../../../repo/artworkRepo";
import { VoteController } from "./voteController";
import { VoteUseCase } from "./voteUseCase";

export const voteUseCase = new VoteUseCase(artworkRepo);
export const voteController = new VoteController(voteUseCase);
