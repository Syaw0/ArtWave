import { left, Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { Artwork } from "../../../domain/artwork";
import { ArtworkRepoProps } from "../../../repo/artworkRepo";
import { GetArtworkByIdDTO } from "./getArtworkByIdDTO";
import { GetArtworkByIdError } from "./getArtworkByIdError";
import { GetArtworkByIdResponse } from "./getArtworkByIdResponse";

export class GetArtworkByIdUseCase
  implements UseCase<GetArtworkByIdDTO, GetArtworkByIdResponse>
{
  constructor(private artworkRepo: ArtworkRepoProps) {}

  async execute(request: GetArtworkByIdDTO): Promise<GetArtworkByIdResponse> {
    let artwork: Artwork;
    try {
      artwork = await this.artworkRepo.findOneArtwork(request.artworkId);
      //also here we must use comment and vote repos to get the
      //more information about this
    } catch (err) {
      return left(new GetArtworkByIdError.ArtworkNotFound());
    }
    return right(Result.ok<Artwork>(artwork));
  }
}
