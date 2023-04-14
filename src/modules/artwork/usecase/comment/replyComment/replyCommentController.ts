import { Request, Response } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { ReplyCommentDTO } from "./replyCommentDTO";
import { ReplyCommentError } from "./replyCommentError";
import { ReplyCommentUseCase } from "./replyCommentUseCase";
export class ReplyCommentController extends BaseController {
  constructor(private usecase: ReplyCommentUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: ReplyCommentDTO = req.body;

    try {
      const result = await this.usecase.execute(dto);
      if (result.isLeft() == true) {
        const error = result.value;
        const errorMsg = error.getErrorValue().message || error.getErrorValue();
        switch (error.constructor) {
          case ReplyCommentError.ParentCommentNotFound:
            return this.notFound(res, errorMsg);
            break;
          default:
            return this.fail(res, errorMsg);
        }
      } else {
        this.ok(res);
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
