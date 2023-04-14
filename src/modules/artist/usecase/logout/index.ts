import { authenticationService } from "../../service";
import { LogoutController } from "./logoutController";
import { LogoutUseCase } from "./logoutUseCase";

export const logoutUseCase = new LogoutUseCase(authenticationService);
export const logoutController = new LogoutController(logoutUseCase);
