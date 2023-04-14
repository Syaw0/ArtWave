import express from "express";
import { addCommentController } from "../../../usecase/comment/addComment";
import { removeCommentController } from "../../../usecase/comment/removeComment";
import { replyCommentController } from "../../../usecase/comment/replyComment";

const commentRouter = express.Router();

commentRouter.post("/add", (req, res) =>
  addCommentController.execute(req, res)
);

commentRouter.post("/remove", (req, res) =>
  removeCommentController.execute(req, res)
);

commentRouter.post("/reply", (req, res) =>
  replyCommentController.execute(req, res)
);

export { commentRouter };
