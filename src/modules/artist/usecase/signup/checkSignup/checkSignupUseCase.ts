import { left, Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { ArtistEmail } from "../../../domain/artistEmail";
import { ArtistPassword } from "../../../domain/artistPassword";
import { ArtistRepoProps } from "../../../repo/artistRepo";
import { EmailVerificationService } from "../../../service/emailVerificationService";
import { CheckSignupDTO } from "./checkSignupDTO";
import { CheckSignupError } from "./checkSignupError";
import { CheckSignupResponse } from "./checkSignupResponse";

export class CheckSignupUseCase
  implements UseCase<CheckSignupDTO, CheckSignupResponse>
{
  private artistRepo: ArtistRepoProps;
  private emailVerificationService: EmailVerificationService;
  constructor(
    artistRepo: ArtistRepoProps,
    emailVerificationService: EmailVerificationService
  ) {
    this.artistRepo = artistRepo;
    this.emailVerificationService = emailVerificationService;
  }

  async execute(request: CheckSignupDTO): Promise<CheckSignupResponse> {
    const artistEmailOrError = ArtistEmail.create(request.email);
    const artistPasswordOrError = ArtistPassword.create(request.password);

    const dtoOrError = Result.combine([
      artistEmailOrError,
      artistPasswordOrError,
    ]);

    if (dtoOrError.isFailure) {
      return left(Result.fail<void>(dtoOrError.getErrorValue()));
    }

    const isEmailExist = await this.artistRepo.exists(
      artistEmailOrError.getValue()
    );

    if (isEmailExist) {
      return left(new CheckSignupError.EmailExist(request.email));
    }

    await this.emailVerificationService.sendToken(
      artistEmailOrError.getValue().value
    );

    return right(Result.ok<any>());
  }
}
