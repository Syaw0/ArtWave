import express from "express";
import { addCommentController } from "../../../usecase/comment/addComment";
import { removeCommentController } from "../../../usecase/comment/removeComment";

const commentRouter = express.Router();

commentRouter.post("/add", (req, res) =>
  addCommentController.execute(req, res)
);

commentRouter.post("/remove", (req, res) =>
  removeCommentController.execute(req, res)
);

export { commentRouter };
