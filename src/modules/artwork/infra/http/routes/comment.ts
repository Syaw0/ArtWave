import express from "express";
import { addCommentController } from "../../../usecase/comment/addComment";

const commentRouter = express.Router();

commentRouter.post("/add", (req, res) =>
  addCommentController.execute(req, res)
);

export { commentRouter };
