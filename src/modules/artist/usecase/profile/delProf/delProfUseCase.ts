import { left, Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { ProfileService } from "../../../service/profile/profileService";
import { DelProfDTO } from "./delProfDTO";
import { DelProfError } from "./delProfError";
import { DelProfResponse } from "./delProfResponse";

export class DelProfUseCase implements UseCase<DelProfDTO, DelProfResponse> {
  constructor(private profService: ProfileService) {}

  async execute(request: DelProfDTO): Promise<DelProfResponse> {
    try {
      await this.profService.del(request.email);
    } catch (err: any) {
      if (err.code === "ENOENT") {
        return left(new DelProfError.ProfNotFound());
      }
      throw new Error(err);
    }
    return right(Result.ok<void>());
  }
}
