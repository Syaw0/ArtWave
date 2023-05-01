import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/baseController";
import { SubscribeUseCase } from "./subscribeUseCase";
import { SubscribeDTO } from "./subscribeDTO";

export class SubscribeController extends BaseController {
  constructor(private useCase: SubscribeUseCase) {
    super();
  }
  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const dto: SubscribeDTO = req.body;
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
      this.fail(res, err);
    }
  }
}
