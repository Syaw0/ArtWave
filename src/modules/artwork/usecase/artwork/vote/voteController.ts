import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { VoteDTO } from "./voteDTO";
import { VoteError } from "./voteError";
import { VoteUseCase } from "./voteUseCase";

export class VoteController extends BaseController {
  constructor(private usecase: VoteUseCase) {
    super();
  }
  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: VoteDTO = req.body;
    try {
      const result = await this.usecase.execute(dto);
      if (result.isLeft() == true) {
        const error = result.value;
        const errorMsg = error.getErrorValue().message || error.getErrorValue();

        switch (error.constructor) {
          case VoteError.ErrorDuringCreateVote:
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
