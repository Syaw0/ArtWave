import { left, Result, right } from "../../../../shared/core/result";
import { UseCase } from "../../../../shared/core/usecase";
import { Artist } from "../../domain/artist";
import { ArtistBiography } from "../../domain/artistBiography";
import { ArtistName } from "../../domain/artistName";
import { ArtistRepoProps } from "../../repo/artistRepo";
import { ChangeInformationError } from "./chageInfomationError";
import { ChangeInformationDTO } from "./changeInformationDTO";
import { ChangeInformationResponse } from "./changeInformationResponse";

export class ChangeInformationUseCase
  implements UseCase<ChangeInformationDTO, ChangeInformationResponse>
{
  constructor(private artistRepo: ArtistRepoProps) {}

  async execute(
    request: ChangeInformationDTO
  ): Promise<ChangeInformationResponse> {
    let artist: Artist;
    try {
      artist = await this.artistRepo.findByEmail(request.email);
    } catch (err) {
      return left(new ChangeInformationError.ArtistNotFound());
    }
    const nameOrError = ArtistName.create(request.name);
    const bioOrError = ArtistBiography.create(request.biography);

    const dto = Result.combine([nameOrError, bioOrError]);
    if (dto.isFailure) {
      return left(dto);
    }

    artist.updateBiography = bioOrError.getValue();
    artist.updateName = nameOrError.getValue();

    await this.artistRepo.updateArtist(artist);
    return right(Result.ok<void>());
  }
}
