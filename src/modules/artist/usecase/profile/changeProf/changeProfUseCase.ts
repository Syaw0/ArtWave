import { Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { ProfileService } from "../../../service/profile/profileService";
import { ChangeProfDTO } from "./changeProfDTO";
import { ChangeProfResponse } from "./changeProfResponse";

export class ChangeProfUseCase
  implements UseCase<ChangeProfDTO, ChangeProfResponse>
{
  constructor(private profService: ProfileService) {}

  async execute(request: ChangeProfDTO): Promise<ChangeProfResponse> {
    await this.profService.save(request.email, request.image);
    return right(Result.ok<void>());
  }
}
