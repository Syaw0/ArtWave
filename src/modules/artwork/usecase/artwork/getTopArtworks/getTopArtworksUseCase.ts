import { Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { Artwork } from "../../../domain/artwork";
import { ArtworkRepoProps } from "../../../repo/artworkRepo";
import { GetTopArtworksDTO } from "./getTopArtworksDTO";
import { GetTopArtworksResponse } from "./getTopArtworksResponse";

export class GetTopArtworksUseCase
  implements UseCase<GetTopArtworksDTO, GetTopArtworksResponse>
{
  constructor(private artworkRepo: ArtworkRepoProps) {}

  async execute(request: GetTopArtworksDTO): Promise<GetTopArtworksResponse> {
    const artworks = await this.artworkRepo.findTopArtworks();
    return right(Result.ok<Artwork[]>(artworks));
  }
}
