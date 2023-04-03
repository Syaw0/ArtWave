import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../../../../shared/infra/http/models/baseController";
import { GetArtistByEmailDTO } from "./getArtistByEmailDTO";
import { GetArtistByEmailError } from "./getArtistByEmailError";
import { GetArtistByEmailUseCase } from "./getArtistByEmailUseCase";

export class GetArtistByEmailController extends BaseController {
  constructor(private getArtistByEmailUseCase: GetArtistByEmailUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: GetArtistByEmailDTO = req.params as any;

    try {
      const result = await this.getArtistByEmailUseCase.execute(dto);
      if (result.isLeft() == true) {
        const error = result.value;
        const errorValue =
          error.getErrorValue().message || error.getErrorValue();
        switch (error.constructor) {
          case GetArtistByEmailError.ArtistNotFound:
            return this.conflict(res, errorValue);
            break;
          default:
            return this.fail(res, errorValue);
        }
      } else {
        this.ok(res, result.value.getValue());
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
