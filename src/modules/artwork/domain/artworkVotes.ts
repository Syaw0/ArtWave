import { WatchedList } from "../../../shared/domain/watchedList";
import { ArtworkVote } from "./artworkVote";

export class ArtworkVotes extends WatchedList<ArtworkVote> {
  private constructor(initialVotes: ArtworkVote[]) {
    super(initialVotes);
  }

  public compareItems(a: ArtworkVote, b: ArtworkVote): boolean {
    return a.equals(b);
  }

  public static create(initialVotes?: ArtworkVote[]) {
    return new ArtworkVotes(initialVotes ? initialVotes : []);
  }

  public getByArtistId(artistId: string): ArtworkVote {
    return this.currentItems.filter(
      (i) => i.artistId.id.toString() === artistId
    )[0];
  }
}
