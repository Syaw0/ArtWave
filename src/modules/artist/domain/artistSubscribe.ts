import { WatchedList } from "../../../shared/domain/watchedList";
import { ArtistId } from "./artistId";

export class ArtistSubscribe extends WatchedList<ArtistId> {
  constructor(initialSubscriber: ArtistId[]) {
    super(initialSubscriber);
  }

  compareItems(a: ArtistId, b: ArtistId): boolean {
    return a.equals(b);
  }

  public static create(initialSubscriber?: ArtistId[]): ArtistSubscribe {
    return new ArtistSubscribe(initialSubscriber ? initialSubscriber : []);
  }
}
