import { UseCase } from "../../../../../shared/core/usecase";
import { ArtworkRepoProps } from "../../../repo/artworkRepo";
import { GetArtistArtworkDTO } from "./getArtistArtworkDTO";
import { GetArtistArtworkResponse } from "./getArtistArtworkResponse";

export class GetArtistArtworkUseCase
  implements UseCase<GetArtistArtworkDTO, GetArtistArtworkResponse>
{
  constructor(private artworkRepo: ArtworkRepoProps) {}

  execute(request: GetArtistArtworkDTO): Promise<GetArtistArtworkResponse> {}
}
