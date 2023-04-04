import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { Mapper } from "../../../shared/infra/mapper";
import { ArtworkVote } from "../domain/artworkVote";

export class ArtworkVoteMapper implements Mapper<ArtworkVote> {
  static toDomain(raw: any): ArtworkVote | null {
    const vote = ArtworkVote.create(
      {
        artistId: raw.artwork_vote_artist_id,
        artworkId: raw.artwork_vote_artwork_id,
      },
      new UniqueEntityID(raw.artwork_vote_id)
    );
    if (vote.isFailure) {
      console.error(vote.getErrorValue());
      return null;
    }
    return vote.getValue();
  }

  static toPersistence(vote: ArtworkVote): any {
    return {
      artwork_vote_id: vote.id.toString(),
      artwork_vote_artwork_id: vote.artworkId.id.toString(),
      artwork_vote_artist_id: vote.artistId.id.toString(),
    };
  }
}
