import { artistRepo } from "../../../repo/artistRepo";
import {
  authenticationService,
  emailVerificationService,
} from "../../../service";
import { CheckTokenController } from "./checkSignupTokenController";
import { CheckTokenUseCase } from "./checkSignupTokenUseCase";

const checkTokenUseCase = new CheckTokenUseCase(
  emailVerificationService,
  authenticationService,
  artistRepo
);
const checkSignupTokenController = new CheckTokenController(checkTokenUseCase);

export { checkSignupTokenController, checkTokenUseCase };
