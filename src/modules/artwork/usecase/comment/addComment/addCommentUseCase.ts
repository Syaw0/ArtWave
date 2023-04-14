import { left, Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { UniqueEntityID } from "../../../../../shared/domain/uniqueEntityID";
import { ArtistId } from "../../../../artist/domain/artistId";
import { ArtworkId } from "../../../domain/artworkId";
import { Comment } from "../../../domain/comment";
import { CommentText } from "../../../domain/commentText";
import { ArtworkRepoProps } from "../../../repo/artworkRepo";
import { AddCommentDTO } from "./addCommentDTO";
import { AddCommentResponse } from "./addCommentResponse";

export class AddCommentUseCase
  implements UseCase<AddCommentDTO, AddCommentResponse>
{
  constructor(private artworkRepo: ArtworkRepoProps) {}
  async execute(request: AddCommentDTO): Promise<AddCommentResponse> {
    const artwork = await this.artworkRepo.findOneArtwork(request.artworkId);
    const cmOrError = Comment.create({
      owner: ArtistId.create(new UniqueEntityID(request.artistId)).getValue(),
      place: ArtworkId.create(new UniqueEntityID(request.artworkId)).getValue(),
      publishDate: new Date(),
      text: CommentText.create({ text: request.text }).getValue(),
    });

    if (cmOrError.isFailure) {
      return left(Result.fail<any>(cmOrError.getErrorValue() as any));
    }
    artwork.comments?.add(cmOrError.getValue());
    await this.artworkRepo.updateArtwork(artwork);
    return right(Result.ok<void>());
  }
}
