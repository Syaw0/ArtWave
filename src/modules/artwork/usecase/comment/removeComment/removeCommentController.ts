import { Request, Response } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { RemoveCommentDTO } from "./removeCommentDTO";
import { RemoveCommentError } from "./removeCommentError";
import { RemoveCommentUseCase } from "./removeCommentUseCase";
export class AddCommentController extends BaseController {
  constructor(private usecase: RemoveCommentUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: RemoveCommentDTO = req.body;

    try {
      const result = await this.usecase.execute(dto);
      if (result.isLeft() == true) {
        const error = result.value;
        const errorMsg = error.getErrorValue().message || error.getErrorValue();
        switch (error.constructor) {
          case RemoveCommentError.NotFound:
            return this.conflict(res, errorMsg);
            break;
          default:
            this.fail(res, errorMsg);
        }
      } else {
        this.ok(res);
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
