import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { CreateArtworkDTO } from "./createArtworkDTO";
import { CreateArtworkError } from "./createArtworkError";
import { CreateArtworkUseCase } from "./createArtworkUseCase";

export class CreateArtworkController extends BaseController {
  constructor(private usecase: CreateArtworkUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const files: any = req.files;
    const dto: CreateArtworkDTO = {
      ...req.body,
      image: files.image.data,
    };
    try {
      const result = await this.usecase.execute(dto);
      if (result.isLeft() == true) {
        const error = result.value;
        const errorMsg = error.getErrorValue().message || error.getErrorValue();
        switch (error.constructor) {
          case CreateArtworkError.FailedToCreateArtwork:
            return this.conflict(res, errorMsg);
            break;
          default:
            this.fail(res, errorMsg);
        }
      } else {
        this.ok(res);
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
