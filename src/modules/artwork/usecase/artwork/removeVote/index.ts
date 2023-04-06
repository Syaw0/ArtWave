import { artworkRepo } from "../../../repo/artworkRepo";
import { VoteController } from "./removeVoteController";
import { RemoveVoteUseCase } from "./removeVoteUseCase";

export const removeVoteUseCase = new RemoveVoteUseCase(artworkRepo);
export const removeVoteController = new VoteController(removeVoteUseCase);
