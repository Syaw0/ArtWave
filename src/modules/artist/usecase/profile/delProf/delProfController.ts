import { Request, Response } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { DelProfDTO } from "./delProfDTO";
import { DelProfError } from "./delProfError";
import { DelProfUseCase } from "./delProfUseCase";

export class DelProfController extends BaseController {
  constructor(private delProfUseCase: DelProfUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: DelProfDTO = req.query as any;
    try {
      const result = await this.delProfUseCase.execute(dto);
      if (result.isLeft() == true) {
        const error = result.value;
        switch (error.constructor) {
          case DelProfError.ProfNotFound:
            return this.conflict(res, "Could not found the profile.");
            break;
          default:
            this.fail(
              res,
              error.getErrorValue().message || error.getErrorValue()
            );
        }
      } else {
        this.ok(res);
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
