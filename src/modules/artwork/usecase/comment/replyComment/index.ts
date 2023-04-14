import { artworkRepo } from "../../../repo/artworkRepo";
import { ReplyCommentController } from "./replyCommentController";
import { ReplyCommentUseCase } from "./replyCommentUseCase";

export const replyCommentUseCase = new ReplyCommentUseCase(artworkRepo);
export const replyCommentController = new ReplyCommentController(
  replyCommentUseCase
);
