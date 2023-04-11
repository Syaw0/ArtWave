import { UniqueEntityID } from "../../../shared/domain/uniqueEntityID";
import { Mapper } from "../../../shared/infra/mapper";
import { ArtistId } from "../../artist/domain/artistId";
import { ArtworkId } from "../domain/artworkId";
import { ArtworkVote } from "../domain/artworkVote";
import { ArtworkVoteDTO } from "../dto/artworkVoteDTO";

export class ArtworkVoteMapper implements Mapper<ArtworkVote> {


  static toDTO(vote:ArtworkVote):ArtworkVoteDTO|null{
    return{
      artistId:vote.artistId.id.toString(),
      artworkId:vote.artworkId.id.toString(),
      voteId:vote.id.toString()
    }
  }


  static toDomain(raw: any): ArtworkVote | null {
    const vote = ArtworkVote.create(
      {
        artistId: ArtistId.create(
          new UniqueEntityID(raw.artwork_vote_artist_id)
        ).getValue(),
        artworkId: ArtworkId.create(
          new UniqueEntityID(raw.artwork_vote_artwork_id)
        ).getValue(),
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
