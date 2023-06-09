import { CookieOptions, Request, Response } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { CheckTokenDTO } from "./checkTokenDTO";
import { CheckTokenError } from "./checkTokenError";
import { CheckTokenUseCase } from "./checkTokenUseCase";

export class CheckTokenController extends BaseController {
  constructor(private checkTokenUseCase: CheckTokenUseCase) {
    super();
  }
  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: CheckTokenDTO = req.body as CheckTokenDTO;
    try {
      const result = await this.checkTokenUseCase.execute(dto);
      if (result.isLeft() == true) {
        const error = result.value;
        const errorMsg = error.getErrorValue().message || error.getErrorValue();
        switch (error.constructor) {
          case CheckTokenError.TokenIsBurned:
            return this.conflict(res, errorMsg);
          case CheckTokenError.TokenIsNotExist:
            return this.conflict(res, errorMsg);
          case CheckTokenError.WrongToken:
            return this.conflict(res, errorMsg);
          default:
            return this.fail(res, errorMsg);
        }
      } else {
        const value = result.value.getValue();
        const cookieConfig: CookieOptions = {
          httpOnly: true,
          // secure: true,
          sameSite: "strict",
        };
        res.cookie("access", value.accessToken, cookieConfig);
        res.cookie("refresh", value.refreshToken, cookieConfig);
        this.ok(res, { status: true, message: "Its Okay" });
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
