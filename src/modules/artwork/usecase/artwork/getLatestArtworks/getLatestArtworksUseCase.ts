import { Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { Artwork } from "../../../domain/artwork";
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
    return right(Result.ok<Artwork[]>(artworks));
  }
}
