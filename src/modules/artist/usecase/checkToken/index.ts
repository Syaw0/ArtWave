import { artistRepo } from "../../repo/artistRepo";
import { authenticationService, emailVerificationService } from "../../service";
import { CheckTokenController } from "./checkTokenController";
import { CheckTokenUseCase } from "./checkTokenUseCase";

const checkTokenUseCase = new CheckTokenUseCase(
  emailVerificationService,
  authenticationService,
  artistRepo
);
const checkTokenController = new CheckTokenController(checkTokenUseCase);

export { checkTokenController, checkTokenUseCase };
