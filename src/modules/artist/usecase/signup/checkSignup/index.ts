import { artistRepo } from "../../../repo/artistRepo";
import { emailVerificationService } from "../../../service";
import { CheckSignupController } from "./checkSignupController";
import { CheckSignupUseCase } from "./checkSignupUseCase";

const checkSignupUseCase = new CheckSignupUseCase(
  artistRepo,
  emailVerificationService
);
const checkSignupController = new CheckSignupController(checkSignupUseCase);

export { checkSignupController, checkSignupUseCase };
