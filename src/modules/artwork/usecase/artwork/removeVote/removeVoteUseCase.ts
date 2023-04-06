import { left, Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { ArtworkRepoProps } from "../../../repo/artworkRepo";
import { RemoveVoteDTO } from "./removeVoteDTO";
import { RemoveVoteError } from "./removeVoteError";
import { RemoveVoteResponse } from "./removeVoteResponse";

export class RemoveVoteUseCase
  implements UseCase<RemoveVoteDTO, RemoveVoteResponse>
{
  constructor(private artworkRepo: ArtworkRepoProps) {}

  async execute(request: RemoveVoteDTO): Promise<RemoveVoteResponse> {
    const artwork = await this.artworkRepo.findOneArtwork(request.artworkId);

    const vote = artwork.votes?.getByArtistId(request.artistId);
    if (vote == null) {
      return left(new RemoveVoteError.NotFound());
    }
    console.log("pre", artwork.votes?.currentItems);
    artwork.removeVote(vote);
    console.log("next", artwork.votes?.currentItems);
    await this.artworkRepo.updateArtwork(artwork);
    return right(Result.ok<void>());
  }
}
