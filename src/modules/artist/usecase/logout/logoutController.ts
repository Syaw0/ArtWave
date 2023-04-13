import { Request, Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/baseController";
import { LogoutDTO } from "./logoutDTO";
import { LogoutError } from "./logoutError";
import { LogoutUseCase } from "./logoutUseCase";

export class LogoutController extends BaseController {
  constructor(private logoutUseCase: LogoutUseCase) {
    super();
  }
  protected async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: LogoutDTO = {
      ...req.body,
      refreshToken: req.body.refreshToken ?? (req.cookies.refresh as string),
    } as LogoutDTO;
    try {
      const result = await this.logoutUseCase.execute(dto);
      if (result.isLeft() == true) {
        const error = result.value;
        switch (error.constructor) {
          case LogoutError.RefreshTokenIsNotProvided:
            return this.conflict(res, "Refresh token is not provided");
            break;
          default:
            this.fail(
              res,
              error.getErrorValue().message || error.getErrorValue()
            );
        }
      } else {
        res.clearCookie("access");
        res.clearCookie("refresh");
        this.ok(res);
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
