import express from "express";
import { changeInformationController } from "../../../usecase/changeInformation";
import { getArtistByEmailController } from "../../../usecase/getArtistByEmail";
import { checkLoginController } from "../../../usecase/login/checkLogin";
import { checkLoginTokenController } from "../../../usecase/login/checkLoginToken";
import { logoutController } from "../../../usecase/logout";
import { changeProfController } from "../../../usecase/profile/changeProf";
import { delProfController } from "../../../usecase/profile/delProf";
import { getProfController } from "../../../usecase/profile/getProf";
import { checkSignupController } from "../../../usecase/signup/checkSignup";
import { checkSignupTokenController } from "../../../usecase/signup/checkSignupToken";
import { subscribeController } from "../../../usecase/subscribe";

const artistRouter = express.Router();

artistRouter.post("/subscribe", (req, res) =>
  subscribeController.execute(req, res)
);

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

artistRouter.get("/getProf", (req, res) => getProfController.execute(req, res));

artistRouter.delete("/delProf", (req, res) =>
  delProfController.execute(req, res)
);

artistRouter.patch("/changeProf", (req, res) =>
  changeProfController.execute(req, res)
);

artistRouter.patch("/changeInformation", (req, res) =>
  changeInformationController.execute(req, res)
);

artistRouter.get("/:email", (req, res) =>
  getArtistByEmailController.execute(req, res)
);

export { artistRouter };
