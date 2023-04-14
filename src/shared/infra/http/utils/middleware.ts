import { NextFunction, Request, Response } from "express";
import { authenticationService } from "../../../../modules/artist/service";
import checkGuestUserAccess from "./checkGuestUserAccess";
import checkLoggedUserAccess from "./checkLoggedUserAccess";

const accessibilityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let result = false;
  if (req.cookies != null || req.cookies.refresh != null) {
    result = await authenticationService.isRefreshTokenExist(
      req.cookies.refresh
    );
  }
  if (!result) {
    if (checkGuestUserAccess(req.originalUrl)) {
      return res.redirect("/login");
    }
  } else if (result) {
    if (checkLoggedUserAccess(req.originalUrl)) {
      return res.redirect("/");
    }
  }

  next();
};

export default accessibilityMiddleware;
