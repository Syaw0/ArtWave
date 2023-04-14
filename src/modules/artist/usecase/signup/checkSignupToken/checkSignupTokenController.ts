import { CookieOptions, Request, Response } from "express";
import { BaseController } from "../../../../../shared/infra/http/models/baseController";
import { CheckTokenDTO } from "./checkSignupTokenDTO";
import { CheckTokenError } from "./checkSignupTokenError";
import { CheckTokenUseCase } from "./checkSignupTokenUseCase";

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
        console.log(error, result);
        switch (error.constructor) {
          case CheckTokenError.TokenIsBurned:
            return this.conflict(res, error.getErrorValue().message);
          case CheckTokenError.TokenIsNotExist:
            return this.conflict(res, error.getErrorValue().message);
          case CheckTokenError.WrongToken:
            return this.conflict(res, error.getErrorValue().message);
          default:
            return this.fail(
              res,
              error.getErrorValue().message || error.getErrorValue()
            );
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
