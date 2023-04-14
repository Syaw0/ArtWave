import { profileService } from "../../../service";
import { ChangeProfController } from "./changeProfController";
import { ChangeProfUseCase } from "./changeProfUseCase";

export const changeProfUseCase = new ChangeProfUseCase(profileService);
export const changeProfController = new ChangeProfController(changeProfUseCase);
