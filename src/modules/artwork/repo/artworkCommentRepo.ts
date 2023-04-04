import { OrmType } from "../../../shared/infra/db/orm/createModel";
import { ArtworkId } from "../domain/artworkId";
import { Comment } from "../domain/comment";
import { ArtworkCommentMapper } from "../mapper/artworkCommentMapper";

export interface ArtworkCommentRepoProps {
  findArtworkComments(artworkId: ArtworkId | string): Promise<Comment[]>;
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
}
