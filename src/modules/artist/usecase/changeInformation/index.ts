import { artistRepo } from "../../repo/artistRepo";
import { ChangeInformationController } from "./changeInformationController";
import { ChangeInformationUseCase } from "./changeInformationUseCase";

export const changeInformationUseCase = new ChangeInformationUseCase(
  artistRepo
);
export const changeInformationController = new ChangeInformationController(
  changeInformationUseCase
);
