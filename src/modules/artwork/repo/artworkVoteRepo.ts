import { OrmType } from "../../../shared/infra/db/orm/createModel";
import { ArtworkId } from "../domain/artworkId";
import { ArtworkVote } from "../domain/artworkVote";
import { ArtworkVoteMapper } from "../mapper/artworkVoteMapper";

export interface ArtworkVoteRepoProps {
  getArtworkVotes(artworkId: ArtworkId | string): Promise<ArtworkVote[]>;
  save(artworkVote: ArtworkVote): Promise<void>;
  exist(artworkVoteId: string): Promise<boolean>;
}

export class ArtworkVoteRepo implements ArtworkVoteRepoProps {
  constructor(private model: OrmType) {}

  async getArtworkVotes(artworkId: string | ArtworkId): Promise<ArtworkVote[]> {
    const artworkVoteModel = this.model.artworkVoteModel;
    const id =
      typeof artworkId === "string" ? artworkId : artworkId.id.toString();
    const votes = await artworkVoteModel.findOne({
      where: {
        artwork_vote_artwork_id: id,
      },
    });
    return votes.length == 0 || votes == null
      ? []
      : votes.map((v: any) => ArtworkVoteMapper.toDomain(v));
  }

  async exist(artworkVoteId: string): Promise<boolean> {
    const artworkVoteModel = this.model.artworkVoteModel;
    const vote = await artworkVoteModel.findOne({
      where: {
        artwork_vote_id: artworkVoteId,
      },
    });
    return !!vote == true && vote.length !== 0;
  }

  async save(artworkVote: ArtworkVote): Promise<void> {
    const artworkVoteModel = this.model.artworkVoteModel;
    const isExist = await this.exist(artworkVote.id.toString());
    if (!isExist) {
      await artworkVoteModel.create(
        ArtworkVoteMapper.toPersistence(artworkVote)
      );
    }
  }
}
