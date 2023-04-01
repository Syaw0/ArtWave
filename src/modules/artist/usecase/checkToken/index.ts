import { emailVerificationService } from "../../service";
import { CheckTokenController } from "./checkTokenController";
import { CheckTokenUseCase } from "./checkTokenUseCase";

const checkTokenUseCase = new CheckTokenUseCase(emailVerificationService);
const checkTokenController = new CheckTokenController(checkTokenUseCase);

export { checkTokenController, checkTokenUseCase };
