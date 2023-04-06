import { Request, Response } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { AddCommentDTO } from "./addCommentDTO";
import { AddCommentUseCase } from "./addCommentUseCase";
export class AddCommentController extends BaseController {
  constructor(private usecase: AddCommentUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: AddCommentDTO = req.body;

    try {
      const result = await this.usecase.execute(dto);
      if (result.isLeft() == true) {
        const error = result.value;
        const errorMsg = error.getErrorValue().message || error.getErrorValue();
        this.fail(res, errorMsg);
      } else {
        this.ok(res);
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
