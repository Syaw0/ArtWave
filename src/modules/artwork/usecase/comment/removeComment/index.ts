import { artworkRepo } from "../../../repo/artworkRepo";
import { AddCommentController } from "./removeCommentController";
import { RemoveCommentUseCase } from "./removeCommentUseCase";

export const removeCommentUseCase = new RemoveCommentUseCase(artworkRepo);
export const removeCommentController = new AddCommentController(
  removeCommentUseCase
);
