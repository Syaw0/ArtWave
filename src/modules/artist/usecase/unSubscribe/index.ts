import { artistRepo } from "../../repo/artistRepo";
import { UnSubscribeController } from "./unSubscribeController";
import { UnSubscribeUseCase } from "./unSubscribeUseCase";

export const unSubscribeUseCase = new UnSubscribeUseCase(artistRepo);
export const unSubscribeController = new UnSubscribeController(
  unSubscribeUseCase
);
