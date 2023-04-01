import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/baseController";
import { CheckTokenDTO } from "./checkTokenDTO";
import { CheckTokenError } from "./checkTokenError";
import { CheckTokenUseCase } from "./checkTokenUseCase";

export class CheckTokenController extends BaseController {
  constructor(private checkTokenUseCase: CheckTokenUseCase) {
    super();
  }
  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: CheckTokenDTO = req.body as CheckTokenDTO;
    try {
      const result = await this.checkTokenUseCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;
        console.log(error, result);
        switch (error.constructor) {
          case CheckTokenError.TokenIsBurned:
            return this.conflict(res, error.getErrorValue().message);
          case CheckTokenError.TokenIsNotExist:
            return this.conflict(res, error.getErrorValue().message);
          case CheckTokenError.WrongToken:
            return this.conflict(res, error.getErrorValue().message);
          default:
            return this.fail(
              res,
              error.getErrorValue().message || error.getErrorValue()
            );
        }
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
