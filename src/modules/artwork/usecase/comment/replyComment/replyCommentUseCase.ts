import { left, Result, right } from "../../../../../shared/core/result";
import { UseCase } from "../../../../../shared/core/usecase";
import { UniqueEntityID } from "../../../../../shared/domain/uniqueEntityID";
import { ArtistId } from "../../../../artist/domain/artistId";
import { ArtworkId } from "../../../domain/artworkId";
import { Comment } from "../../../domain/comment";
import { CommentId } from "../../../domain/commentId";
import { CommentText } from "../../../domain/commentText";
import { ArtworkRepoProps } from "../../../repo/artworkRepo";
import { ReplyCommentDTO } from "./replyCommentDTO";
import { ReplyCommentError } from "./replyCommentError";
import { ReplyCommentResponse } from "./replyCommentResponse";

export class ReplyCommentUseCase
  implements UseCase<ReplyCommentDTO, ReplyCommentResponse>
{
  constructor(private artworkRepo: ArtworkRepoProps) {}
  async execute(request: ReplyCommentDTO): Promise<ReplyCommentResponse> {
    const artwork = await this.artworkRepo.findOneArtwork(request.artworkId);
    const isParentExist = artwork.comments?.isExistByCommentId(
      request.parentComment
    );
    if (!isParentExist) {
      return left(new ReplyCommentError.ParentCommentNotFound());
    }
    const cmOrError = Comment.create({
      owner: ArtistId.create(new UniqueEntityID(request.artistId)).getValue(),
      place: ArtworkId.create(new UniqueEntityID(request.artistId)).getValue(),
      publishDate: new Date(),
      text: CommentText.create({ text: request.text }).getValue(),
      parentComment: CommentId.create(
        new UniqueEntityID(request.parentComment)
      ).getValue(),
    });

    if (cmOrError.isFailure) {
      return left(Result.fail<any>(cmOrError.getErrorValue() as any));
    }
    artwork.comments?.add(cmOrError.getValue());
    await this.artworkRepo.updateArtwork(artwork);
    return right(Result.ok<void>());
  }
}
