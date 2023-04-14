import { Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { ArtworkDTO } from "../../../dto/artworkDTO";
import { ArtworkMapper } from "../../../mapper/artworkMapper";
import { ArtworkRepoProps } from "../../../repo/artworkRepo";
import { SearchArtworksDTO } from "./searchArtworksDTO";
import { SearchArtworksResponse } from "./searchArtworksResponse";

export class SearchArtworksUseCase
  implements UseCase<SearchArtworksDTO, SearchArtworksResponse>
{
  constructor(private artworkRepo: ArtworkRepoProps) {}

  async execute(request: SearchArtworksDTO): Promise<SearchArtworksResponse> {
    try {
      const artworks = await this.artworkRepo.search(request.q);
      const artworksDTO = await Promise.all(
        artworks.map((a) => ArtworkMapper.toDTO(a))
      );
      return right(Result.ok<ArtworkDTO[]>(artworksDTO));
    } catch (err) {
      return right(Result.ok<ArtworkDTO[]>([]));
    }
  }
}
