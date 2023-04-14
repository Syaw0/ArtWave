import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { GetArtistArtworkDTO } from "./getArtistArtworkDTO";
import { GetArtistArtworkUseCase } from "./getArtistArtworkUseCase";

export class GetArtistArtworkController extends BaseController {
  constructor(private usecase: GetArtistArtworkUseCase) {
    super();
  }
  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: GetArtistArtworkDTO = req.params as any;
    try {
      const result = await this.usecase.execute(dto);
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
