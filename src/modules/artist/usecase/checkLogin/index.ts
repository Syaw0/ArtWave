import { artistRepo } from "../../repo/artistRepo";
import { CheckLoginController } from "./checkLoginController";
import { CheckLoginUseCase } from "./checkLoginUseCase";

const checkLoginUseCase = new CheckLoginUseCase(artistRepo);
const checkLoginController = new CheckLoginController(checkLoginUseCase);

export { checkLoginController, checkLoginUseCase };
