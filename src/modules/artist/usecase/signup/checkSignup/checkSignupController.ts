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
      console.log(result);
      if (result.isLeft() == true) {
        const error = result.value;
        switch (error.constructor) {
          case CheckSignupError.EmailExist:
            return this.conflict(res, "Email exist");
          default:
            return this.fail(
              res,
              error.getErrorValue().message || error.getErrorValue()
            );
        }
      } else {
        return this.ok(res, { status: true, message: "Its okay" });
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
