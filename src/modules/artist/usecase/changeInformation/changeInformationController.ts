import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../../../../shared/infra/http/models/baseController";
import { ChangeInformationError } from "./chageInfomationError";
import { ChangeInformationDTO } from "./changeInformationDTO";
import { ChangeInformationUseCase } from "./changeInformationUseCase";

export class ChangeInformationController extends BaseController {
  constructor(private changeInfoUseCase: ChangeInformationUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: ChangeInformationDTO = req.body;
    try {
      const result = await this.changeInfoUseCase.execute(dto);
      if (result.isLeft() == true) {
        const error = result.value;
        const errorMsg = error.getErrorValue().message || error.getErrorValue();
        switch (error.constructor) {
          case ChangeInformationError.ArtistNotFound:
            return this.conflict(res, errorMsg);
            break;
          case ChangeInformationError.CharacterLengthError:
            return this.conflict(res, errorMsg);
            break;
          default:
            return this.fail(res, errorMsg);
        }
      } else {
        this.ok(res);
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
