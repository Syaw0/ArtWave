import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/baseController";
import { UnSubscribeUseCase } from "./unSubscribeUseCase";
import { UnSubscribeDTO } from "./unSubscribeDTO";

export class UnSubscribeController extends BaseController {
  constructor(private useCase: UnSubscribeUseCase) {
    super();
  }
  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const dto: UnSubscribeDTO = req.body;
    try {
      const result = await this.useCase.execute(dto);
      if (result.isRight()) {
        this.ok(res, result.value.getValue());
      } else {
        const error = result.value;
        const errMsg = error.getErrorValue().message || error.getErrorValue();
        this.conflict(res, errMsg as string);
      }
    } catch (err) {
      console.log(err);
      this.fail(res, err);
    }
  }
}
