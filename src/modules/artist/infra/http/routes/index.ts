import express from "express";
import { checkLoginController } from "../../../usecase/login/checkLogin";
import { checkLoginTokenController } from "../../../usecase/login/checkLoginToken";
import { logoutController } from "../../../usecase/logout";
import { checkSignupController } from "../../../usecase/signup/checkSignup";
import { checkSignupTokenController } from "../../../usecase/signup/checkSignupToken";

const artistRouter = express.Router();

artistRouter.post("/checkSignup", (req, res) =>
  checkSignupController.execute(req, res)
);

artistRouter.post("/checkSignupToken", (req, res) =>
  checkSignupTokenController.execute(req, res)
);

artistRouter.post("/checkLogin", (req, res) =>
  checkLoginController.execute(req, res)
);

artistRouter.post("/checkLoginToken", (req, res) =>
  checkLoginTokenController.execute(req, res)
);

artistRouter.post("/logout", (req, res) => logoutController.execute(req, res));

export { artistRouter };
