import { left, Result, right } from "../../../../shared/core/result";
import { UseCase } from "../../../../shared/core/usecase";
import { ArtistEmail } from "../../domain/artistEmail";
import { ArtistPassword } from "../../domain/artistPassword";
import { ArtistRepoProps } from "../../repo/artistRepo";
import { EmailVerificationService } from "../../service/emailVerificationService";
import { CheckLoginDTO } from "./checkLoginDTO";
import { CheckLoginResponse } from "./checkLoginResponse";

export class CheckLoginUseCase
  implements UseCase<CheckLoginDTO, CheckLoginResponse>
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

  async execute(request: CheckLoginDTO): Promise<CheckLoginResponse> {
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

    if (!isEmailExist) {
      return left(Result.fail<void>("The email is not exist."));
    }

    try {
      const artist = await this.artistRepo.findByEmail(
        artistEmailOrError.getValue()
      );
      if (artist == null) {
        return left(Result.fail<void>("Can Not Create Artist Object!"));
      }
      const isPasswordEquals =
        artist.password.props.password === request.password;
      if (!isPasswordEquals)
        return left(Result.fail<void>("password is wrong"));
    } catch (err: any) {
      return left(Result.fail<void>(err));
    }
    await this.emailVerificationService.sendToken(
      artistEmailOrError.getValue().value
    );

    return right(Result.ok<any>());
  }
}
