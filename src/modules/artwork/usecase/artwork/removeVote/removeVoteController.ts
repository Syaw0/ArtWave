import { Request, Response } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { RemoveVoteDTO } from "./removeVoteDTO";
import { RemoveVoteError } from "./removeVoteError";
import { RemoveVoteUseCase } from "./removeVoteUseCase";

export class VoteController extends BaseController {
  constructor(private usecase: RemoveVoteUseCase) {
    super();
  }
  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: RemoveVoteDTO = req.body;
    try {
      const result = await this.usecase.execute(dto);
      if (result.isLeft() == true) {
        const error = result.value;
        const errorMsg = error.getErrorValue().message || error.getErrorValue();

        switch (error.constructor) {
          case RemoveVoteError.NotFound:
            return this.conflict(res, errorMsg);
            break;
          default:
            this.fail(res, errorMsg);
        }
      } else {
        this.ok(res, result.value.getValue());
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
