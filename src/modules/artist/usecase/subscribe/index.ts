import { artistRepo } from "../../repo/artistRepo";
import { SubscribeController } from "./subscribeController";
import { SubscribeUseCase } from "./subscribeUseCase";

export const subscribeUseCase = new SubscribeUseCase(artistRepo);
export const subscribeController = new SubscribeController(subscribeUseCase);
