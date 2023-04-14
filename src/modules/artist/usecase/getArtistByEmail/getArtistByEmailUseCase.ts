import { left, Result, right } from "../../../../shared/core/result";
import { UseCase } from "../../../../shared/core/usecase";
import { Artist } from "../../domain/artist";
import { ArtistRepoProps } from "../../repo/artistRepo";
import { GetArtistByEmailDTO } from "./getArtistByEmailDTO";
import { GetArtistByEmailError } from "./getArtistByEmailError";
import { GetArtistByEmailResponse } from "./getArtistByEmailResponse";

export class GetArtistByEmailUseCase
  implements UseCase<GetArtistByEmailDTO, GetArtistByEmailResponse>
{
  constructor(private artistRepo: ArtistRepoProps) {}
  async execute(
    request: GetArtistByEmailDTO
  ): Promise<GetArtistByEmailResponse> {
    const artist = await this.artistRepo.findByEmail(request.email);
    const isArtistExist = !!artist === true;
    if (!isArtistExist) {
      return left(new GetArtistByEmailError.ArtistNotFound());
    }
    return right(Result.ok<Artist>(artist));
  }
}
