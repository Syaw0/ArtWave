import { left, Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";

import { ArtworkRepoProps } from "../../../repo/artworkRepo";
import { RemoveCommentDTO } from "./removeCommentDTO";
import { RemoveCommentError } from "./removeCommentError";
import { RemoveCommentResponse } from "./removeCommentResponse";

export class RemoveCommentUseCase
  implements UseCase<RemoveCommentDTO, RemoveCommentResponse>
{
  constructor(private artworkRepo: ArtworkRepoProps) {}
  async execute(request: RemoveCommentDTO): Promise<RemoveCommentResponse> {
    const artwork = await this.artworkRepo.findOneArtwork(request.artworkId);
    const comment = artwork.comments?.findByCommentId(request.commentId);
    if (comment == null) {
      return left(new RemoveCommentError.NotFound());
    }
    const child = artwork.comments?.findChildComments(request.commentId);
    artwork.comments?.remove(comment);
    if (child != null) {
      artwork.comments?.removeLs(child);
    }

    await this.artworkRepo.updateArtwork(artwork);
    return right(Result.ok<void>());
  }
}
