import { Request, Response } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { CheckSignupDTO } from "./checkSignupDTO";
import { CheckSignupError } from "./checkSignupError";
import { CheckSignupUseCase } from "./checkSignupUseCase";

export class CheckSignupController extends BaseController {
  private useCase: CheckSignupUseCase;

  constructor(useCase: CheckSignupUseCase) {
    super();
    this.useCase = useCase;
  }
  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: CheckSignupDTO = req.body as CheckSignupDTO;
    try {
      const result: any = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        console.log(error, result);
        switch (error.constructor) {
          case CheckSignupError.EmailExist:
            return this.conflict(res, error.getErrorValue().message);
          default:
            return this.fail(
              res,
              error.getErrorValue().message || error.getErrorValue()
            );
        }
      } else {
        return this.ok(res, result.value.getValue());
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
