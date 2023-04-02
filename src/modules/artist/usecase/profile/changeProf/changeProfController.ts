import { Request, Response } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { ChangeProfDTO } from "./changeProfDTO";
import { ChangeProfUseCase } from "./changeProfUseCase";

export class ChangeProfController extends BaseController {
  constructor(private changeProfUseCase: ChangeProfUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const email = req.body.email as string;
    const files = req.files as any;
    const dto: ChangeProfDTO = { email, image: files.image.data };
    try {
      const result = await this.changeProfUseCase.execute(dto);
      if (result.isLeft() == true) {
        const error = result.value;
        switch (error.constructor) {
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
