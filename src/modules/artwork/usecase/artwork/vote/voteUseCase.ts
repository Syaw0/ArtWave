import { left, Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { UniqueEntityID } from "../../../../../shared/domain/uniqueEntityID";
import { ArtistId } from "../../../../artist/domain/artistId";
import { ArtworkVote } from "../../../domain/artworkVote";
import { ArtworkRepoProps } from "../../../repo/artworkRepo";
import { VoteDTO } from "./voteDTO";
import { VoteError } from "./voteError";
import { VoteResponse } from "./voteResponse";

export class VoteUseCase implements UseCase<VoteDTO, VoteResponse> {
  constructor(private artworkRepo: ArtworkRepoProps) {}

  async execute(request: VoteDTO): Promise<VoteResponse> {
    const artwork = await this.artworkRepo.findOneArtwork(request.artworkId);
    // ? i think we must check if vote for this artist and artwork is not exist first

    const voteOrError = ArtworkVote.create({
      artistId: ArtistId.create(
        new UniqueEntityID(request.artistId)
      ).getValue(),
      artworkId: artwork.artworkId,
    });
    if (voteOrError.isFailure) {
      return left(
        new VoteError.ErrorDuringCreateVote(voteOrError.getErrorValue() as any)
      );
    }

    artwork.addVote(voteOrError.getValue());
    await this.artworkRepo.updateArtwork(artwork);
    return right(Result.ok<void>());
  }
}
