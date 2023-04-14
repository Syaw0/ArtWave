import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { GetArtworkImageDTO } from "./getArtworkImageDTO";
import { GetArtworkImageUseCase } from "./getArtworkImageUseCase";

export class GetArtworkImageController extends BaseController {
  constructor(private usecase: GetArtworkImageUseCase) {
    super();
  }
  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: GetArtworkImageDTO = req.params as any;
    try {
      const result = await this.usecase.execute(dto);
      this.sendFile(res, result.value.getValue());
    } catch (err) {
      this.fail(res, err);
    }
  }
}
