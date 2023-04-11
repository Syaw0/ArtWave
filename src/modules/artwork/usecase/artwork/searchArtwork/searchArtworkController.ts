import { Request, Response } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { SearchArtworksDTO } from "./searchArtworksDTO";
import { SearchArtworksUseCase } from "./searchArtworksUseCase";

export class SearchArtworksController extends BaseController {
  constructor(private usecase: SearchArtworksUseCase) {
    super();
  }
  protected async executeImpl(req: Request, res: Response): Promise<any> {
    try {
      const dto: SearchArtworksDTO = req.query as any;
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
