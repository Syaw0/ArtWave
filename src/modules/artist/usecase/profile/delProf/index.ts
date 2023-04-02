import { profileService } from "../../../service";
import { DelProfController } from "./delProfController";
import { DelProfUseCase } from "./delProfUseCase";

export const delProfUseCase = new DelProfUseCase(profileService);
export const delProfController = new DelProfController(delProfUseCase);
