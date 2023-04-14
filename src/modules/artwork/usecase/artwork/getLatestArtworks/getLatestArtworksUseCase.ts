import { Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { Artwork } from "../../../domain/artwork";
import { ArtworkDTO } from "../../../dto/artworkDTO";
import { ArtworkMapper } from "../../../mapper/artworkMapper";
import { ArtworkRepoProps } from "../../../repo/artworkRepo";
import { GetLatestArtworksDTO } from "./getLatestArtworksDTO";
import { GetLatestArtworksResponse } from "./getLatestArtworksResponse";

export class GetLatestArtworksUseCase
  implements UseCase<GetLatestArtworksDTO, GetLatestArtworksResponse>
{
  constructor(private artworkRepo: ArtworkRepoProps) {}

  async execute(
    request: GetLatestArtworksDTO
  ): Promise<GetLatestArtworksResponse> {
    const artworks = await this.artworkRepo.findLatestArtworks();
    const artworksDTO = await Promise.all(
      artworks.map((a) => ArtworkMapper.toDTO(a))
    );
    return right(Result.ok<ArtworkDTO[]>(artworksDTO));
  }
}
