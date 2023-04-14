import { Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { Artwork } from "../../../domain/artwork";
import { ArtworkRepoProps } from "../../../repo/artworkRepo";
import { GetArtistArtworkDTO } from "./getArtistArtworkDTO";
import { GetArtistArtworkResponse } from "./getArtistArtworkResponse";

export class GetArtistArtworkUseCase
  implements UseCase<GetArtistArtworkDTO, GetArtistArtworkResponse>
{
  constructor(private artworkRepo: ArtworkRepoProps) {}

  async execute(
    request: GetArtistArtworkDTO
  ): Promise<GetArtistArtworkResponse> {
    const artworks = await this.artworkRepo.findArtistArtworks(
      request.artistId
    );
    return right(Result.ok<Artwork[]>(artworks));
  }
}
