import { profileService } from "../../../service";
import { GetProfController } from "./getProfController";
import { GetProfUseCase } from "./getProfUseCase";

export const getProfUseCase = new GetProfUseCase(profileService);
export const getProfController = new GetProfController(getProfUseCase);
