import { Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { ProfileService } from "../../../service/profile/profileService";
import { GetProfDTO } from "./getProfDTO";
import { GetProfResponse } from "./getProfResponse";

export class GetProfUseCase implements UseCase<GetProfDTO, GetProfResponse> {
  constructor(private profService: ProfileService) {}

  async execute(request: GetProfDTO): Promise<GetProfResponse> {
    const prof = await this.profService.retrieve(request.email);
    return right(Result.ok<Buffer>(prof));
  }
}
