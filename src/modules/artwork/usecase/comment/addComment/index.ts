import { artworkRepo } from "../../../repo/artworkRepo";
import { AddCommentController } from "./addCommentController";
import { AddCommentUseCase } from "./addCommentUseCase";

export const addCommentUseCase = new AddCommentUseCase(artworkRepo);
export const addCommentController = new AddCommentController(addCommentUseCase);
