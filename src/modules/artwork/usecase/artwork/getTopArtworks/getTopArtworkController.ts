import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { GetTopArtworksUseCase } from "./getTopArtworksUseCase";

export class GetTopArtworksController extends BaseController {
  constructor(private usecase: GetTopArtworksUseCase) {
    super();
  }
  protected async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const result = await this.usecase.execute({});
      if (result.isLeft() == true) {
        const error = result.value;
        const errorMsg = error.getErrorValue().message || error.getErrorValue();
        this.fail(res, errorMsg);
      } else {
        this.ok(res, result.value.getValue());
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
