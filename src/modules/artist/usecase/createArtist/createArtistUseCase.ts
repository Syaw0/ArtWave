import { AppError } from "../../../../shared/core/appError";
import { left, Result, right } from "../../../../shared/core/result";
import { UseCase } from "../../../../shared/core/usecase";
import { Artist } from "../../domain/artist";
import { ArtistEmail } from "../../domain/artistEmail";
import { ArtistPassword } from "../../domain/artistPassword";
import { ArtistRepoProps } from "../../repo/artistRepo";
import { CreateArtistDTO } from "./createArtistDTO";
import { CreateArtistErrors } from "./createArtistError";
import { CreateArtistResponse } from "./createArtistResponse";

export class CreateArtistUseCase
  implements UseCase<CreateArtistDTO, CreateArtistResponse>
{
  private artistRepo: ArtistRepoProps;

  constructor(artistRepo: ArtistRepoProps) {
    this.artistRepo = artistRepo;
  }

  async execute(request: CreateArtistDTO): Promise<CreateArtistResponse> {
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
      const artistAlreadyExist = await this.artistRepo.exists(email);
      if (artistAlreadyExist) {
        return left(new CreateArtistErrors.EmailAlreadyExist(email.value));
      }
      const artistOrError: Result<Artist> = Artist.create({
        email,
        password,
      });

      if (artistOrError.isFailure) {
        return left(Result.fail<Artist>(String(artistOrError.getErrorValue())));
      }
      const artist: Artist = artistOrError.getValue();
      await this.artistRepo.save(artist);
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
