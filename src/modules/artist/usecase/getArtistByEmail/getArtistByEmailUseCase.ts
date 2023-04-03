import { left, Result, right } from "../../../../shared/core/result";
import { UseCase } from "../../../../shared/core/usecase";
import { ArtistRepoProps } from "../../repo/artistRepo";
import { GetArtistByEmailDTO } from "./getArtistByEmailDTO";
import { GetArtistByEmailError } from "./getArtistByEmailError";
import {
  GetArtistByEmailResponse,
  IGetArtistByEmailResponse,
} from "./getArtistByEmailResponse";

export class GetArtistByEmailUseCase
  implements UseCase<GetArtistByEmailDTO, GetArtistByEmailResponse>
{
  constructor(private artistRepo: ArtistRepoProps) {}
  async execute(
    request: GetArtistByEmailDTO
  ): Promise<GetArtistByEmailResponse> {
    const isArtistExist = await this.artistRepo.exists(request.email);
    if (!isArtistExist) {
      return left(new GetArtistByEmailError.ArtistNotFound());
    }
    const artist = await this.artistRepo.findByEmail(request.email);
    const response = {
      artistId: artist.artistId.id.toString(),
      email: artist.email.value,
      name: artist.name == null ? "" : artist.name.props.name,
      biography:
        artist.biography == null
          ? ""
          : (artist.biography.props.biography as string),
      profilePicture:
        artist.profilePicture == null
          ? ""
          : (artist.profilePicture.props.profileUrl as string),
    };
    return right(Result.ok<IGetArtistByEmailResponse>(response));
  }
}
