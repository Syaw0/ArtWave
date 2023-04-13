import { AppError } from "../../../../../shared/core/appError";
import { left, Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { UniqueEntityID } from "../../../../../shared/domain/uniqueEntityID";
import { Artist } from "../../../domain/artist";
import { ArtistEmail } from "../../../domain/artistEmail";
import { ArtistPassword } from "../../../domain/artistPassword";
import { ArtistProfilePicture } from "../../../domain/artistProfilePicture";
import { ArtistRepoProps } from "../../../repo/artistRepo";
import { EmailVerificationService } from "../../../service/emailVerificationService";
import { RedisAuthenticationService } from "../../../service/redis/redisAuthenticationService";
import { CheckTokenDTO } from "./checkSignupTokenDTO";
import { CheckTokenError } from "./checkSignupTokenError";
import { CheckTokenResponse } from "./checkSignupTokenResponse";

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

    const artistEmailOrError = ArtistEmail.create(request.email);
    const artistPasswordOrError = ArtistPassword.create(request.password);

    const dtoOrError = Result.combine([
      artistEmailOrError,
      artistPasswordOrError,
    ]);

    if (dtoOrError.isFailure) {
      return left(Result.fail<void>(dtoOrError.getErrorValue()));
    }
    const email = artistEmailOrError.getValue();
    const password = artistPasswordOrError.getValue();

    try {
      const artistId = new UniqueEntityID();
      const artistOrError: Result<Artist> = Artist.create(
        {
          email,
          password,
          profilePicture: ArtistProfilePicture.create(
            `/artist/getProf?artistId=${artistId.toString()}`
          ).getValue(),
        },
        artistId
      );

      if (artistOrError.isFailure) {
        return left(Result.fail<Artist>(String(artistOrError.getErrorValue())));
      }
      const artist: Artist = artistOrError.getValue();
      artist.profilePicture;
      const accessToken = this.authService.signJWT({
        email: request.email,
        artistId: artist.artistId.id.toString(),
      });

      const refreshToken = this.authService.createRefreshToken();
      artist.setAccessToken(accessToken, refreshToken);
      await this.artistRepo.save(artist);

      await this.authService.saveAuthenticateArtist(artist);

      return right(Result.ok<any>({ accessToken, refreshToken }));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
