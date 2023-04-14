import { Request, Response } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { CheckLoginDTO } from "./checkLoginDTO";
import { CheckLoginError } from "./checkLoginError";
import { CheckLoginUseCase } from "./checkLoginUseCase";

export class CheckLoginController extends BaseController {
  private useCase: CheckLoginUseCase;

  constructor(useCase: CheckLoginUseCase) {
    super();
    this.useCase = useCase;
  }
  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: CheckLoginDTO = req.body as CheckLoginDTO;
    try {
      const result: any = await this.useCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;
        const errorMsg = error.getErrorValue().message || error.getErrorValue();
        console.log(errorMsg);
        switch (error.constructor) {
          case CheckLoginError.NotFoundEmail:
            return this.fail(res, "NOt found email");
          case CheckLoginError.EmailAndPasswordDoesNotMatch:
            return this.fail(res, "Email and password not match");
          default:
            return this.fail(res, errorMsg);
        }
      } else {
        return this.ok(res, { status: true, message: "Its Okay" });
      }
    } catch (err) {
      this.fail(res, "Error in server 500");
    }
  }
}
