import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { GetProfDTO } from "./getProfDTO";
import { GetProfUseCase } from "./getProfUseCase";

export class GetProfController extends BaseController {
  constructor(private getProfUseCase: GetProfUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: GetProfDTO = req.query as any;
    try {
      const result = await this.getProfUseCase.execute(dto);
      if (result.isLeft() == true) {
        const error = result.value;
        switch (error.constructor) {
          default:
            this.fail(
              res,
              error.getErrorValue().message || error.getErrorValue()
            );
        }
      } else {
        const bufferProf = result.value.getValue() as Buffer;
        return this.sendFile(res, bufferProf);
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
