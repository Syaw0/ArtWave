import { artistRepo } from "../../repo/artistRepo";
import { emailVerificationService } from "../../service";
import { CheckLoginController } from "./checkLoginController";
import { CheckLoginUseCase } from "./checkLoginUseCase";

const checkLoginUseCase = new CheckLoginUseCase(
  artistRepo,
  emailVerificationService
);
const checkLoginController = new CheckLoginController(checkLoginUseCase);

export { checkLoginController, checkLoginUseCase };
