import models, { OrmType } from "../../../shared/infra/db/orm/createModel";
import { ArtworkId } from "../domain/artworkId";
import { Comment } from "../domain/comment";
import { CommentId } from "../domain/commentId";
import { ArtworkCommentMapper } from "../mapper/artworkCommentMapper";

export interface ArtworkCommentRepoProps {
  findArtworkComments(artworkId: ArtworkId | string): Promise<Comment[]>;
  save(comment: Comment): Promise<void>;
  exist(commentId: CommentId | string): Promise<boolean>;
}

export class ArtworkCommentRepo implements ArtworkCommentRepoProps {
  constructor(private model: OrmType) {}

  async findArtworkComments(artworkId: string | ArtworkId): Promise<Comment[]> {
    const artworkCommentModel = this.model.artworkCommentModel;
    const id =
      typeof artworkId === "string" ? artworkId : artworkId.id.toString();
    const comments = await artworkCommentModel.findOne({
      where: {
        artwork_comment_artwork_id: id,
      },
    });
    if (comments.length == 0) return [];
    return comments.map((cm: any) => ArtworkCommentMapper.toDomain(cm));
  }

  async exist(commentId: string | CommentId): Promise<boolean> {
    const artworkCommentModel = this.model.artworkCommentModel;
    const id =
      typeof commentId === "string" ? commentId : commentId.id.toString();
    const comment = await artworkCommentModel.findOne({
      where: {
        artwork_comment_id: id,
      },
    });
    return !!comment == true && comment.length !== 0;
  }

  async save(comment: Comment): Promise<void> {
    const artworkCommentModel = this.model.artworkCommentModel;
    const isExist = await this.exist(comment.commentId);
    if (!isExist) {
      artworkCommentModel.create(ArtworkCommentMapper.toPersistence(comment));
    }
  }
}

export const artworkCommentRepo = new ArtworkCommentRepo(models);
