import { Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/baseController";
import { DecodedExpressRequest } from "../../infra/http/models/decodeRequest";
import { CreateArtistDTO } from "./createArtistDTO";
import { CreateArtistErrors } from "./createArtistError";
import { CreateArtistUseCase } from "./createArtistUseCase";

export class CreateArtistController extends BaseController {
  private useCase: CreateArtistUseCase;

  constructor(useCase: CreateArtistUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl(
    req: DecodedExpressRequest,
    res: Response
  ): Promise<any> {
    const dto: CreateArtistDTO = req.body as CreateArtistDTO;

    try {
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case CreateArtistErrors.EmailAlreadyExist:
            return this.conflict(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
