import { OrmType } from "../../../shared/infra/db/orm/createModel";
import { ArtworkId } from "../domain/artworkId";
import { ArtworkVote } from "../domain/artworkVote";

export interface ArtworkVoteRepoProps {
  getArtworkVotes(artworkId: ArtworkId | string): Promise<ArtworkVote[]>;
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
    return votes.length == 0 || votes == null ? [] : votes;
  }
}
