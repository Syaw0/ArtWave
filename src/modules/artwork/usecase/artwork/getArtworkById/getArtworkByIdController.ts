import { Request, Response } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { GetArtworkByIdDTO } from "./getArtworkByIdDTO";
import { GetArtworkByIdError } from "./getArtworkByIdError";
import { GetArtworkByIdUseCase } from "./getArtworkByIdUseCase";

export class GetArtworkByIdController extends BaseController {
  constructor(private usecase: GetArtworkByIdUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: GetArtworkByIdDTO = req.params as any;
    try {
      const result = await this.usecase.execute(dto);
      if (result.isLeft() == true) {
        const error = result.value;
        const errorMsg = error.getErrorValue().message || error.getErrorValue();
        switch (error.constructor) {
          case GetArtworkByIdError.ArtworkNotFound:
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
