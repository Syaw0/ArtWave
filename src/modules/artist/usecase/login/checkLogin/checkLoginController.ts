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
        console.log(error, result);
        switch (error.constructor) {
          case CheckLoginError.NotFoundEmail:
            return this.conflict(res, error.getErrorValue().message);
          case CheckLoginError.EmailAndPasswordDoesNotMatch:
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
