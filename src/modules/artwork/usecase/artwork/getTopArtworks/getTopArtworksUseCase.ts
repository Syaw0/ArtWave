import { Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { ArtworkDTO } from "../../../dto/artworkDTO";
import { ArtworkMapper } from "../../../mapper/artworkMapper";
import { ArtworkRepoProps } from "../../../repo/artworkRepo";
import { GetTopArtworksDTO } from "./getTopArtworksDTO";
import { GetTopArtworksResponse } from "./getTopArtworksResponse";

export class GetTopArtworksUseCase
  implements UseCase<GetTopArtworksDTO, GetTopArtworksResponse>
{
  constructor(private artworkRepo: ArtworkRepoProps) {}

  async execute(request: GetTopArtworksDTO): Promise<GetTopArtworksResponse> {
    const artworks = await this.artworkRepo.findTopArtworks();
    const artworksDTO = await Promise.all(
      artworks.map((a) => ArtworkMapper.toDTO(a))
    );
    return right(Result.ok<ArtworkDTO[]>(artworksDTO));
  }
}
