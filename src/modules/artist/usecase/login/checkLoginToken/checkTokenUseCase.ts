import { left, Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { ArtistRepoProps } from "../../../repo/artistRepo";
import { EmailVerificationService } from "../../../service/emailVerificationService";
import { RedisAuthenticationService } from "../../../service/redis/redisAuthenticationService";
import { CheckTokenDTO } from "./checkTokenDTO";
import { CheckTokenError } from "./checkTokenError";
import { CheckTokenResponse } from "./checkTokenResponse";

export class CheckTokenUseCase
  implements UseCase<CheckTokenDTO, CheckTokenResponse>
{
  constructor(
    private emailVerificationService: EmailVerificationService,
    private authService: RedisAuthenticationService,
    private artistRepo: ArtistRepoProps
  ) {}

  async execute(request: CheckTokenDTO): Promise<CheckTokenResponse> {
    const isExist = await this.emailVerificationService.isTokenExist(
      request.email
    );
    if (!isExist) {
      return left(new CheckTokenError.TokenIsNotExist());
    }

    const isBurned = await this.emailVerificationService.isTokenBurned(
      request.email
    );
    if (isBurned) {
      return left(new CheckTokenError.TokenIsBurned());
    }

    const isEqual = await this.emailVerificationService.checkToken(
      request.email,
      request.token
    );
    if (!isEqual) {
      return left(new CheckTokenError.WrongToken());
    }

    const artist = await this.artistRepo.findByEmail(request.email);

    const accessToken = this.authService.signJWT({
      email: request.email,
      artistId: artist.artistId.id.toString(),
    });

    const refreshToken = this.authService.createRefreshToken();
    artist.setAccessToken(accessToken, refreshToken);
    await this.authService.saveAuthenticateArtist(artist);

    return right(Result.ok<any>({ accessToken, refreshToken }));
  }
}
