import { left, Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { Artwork } from "../../../domain/artwork";
import { ArtworkDTO } from "../../../dto/artworkDTO";
import { ArtworkMapper } from "../../../mapper/artworkMapper";
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
      const artworkDTO = await ArtworkMapper.toDTO(artwork);
      return right(Result.ok<ArtworkDTO>(artworkDTO));
    } catch (err) {
      return left(new GetArtworkByIdError.ArtworkNotFound());
    }
  }
}
