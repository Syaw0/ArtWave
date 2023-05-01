import { WatchedList } from "../../../shared/domain/watchedList";
import { ArtistId } from "./artistId";

export class ArtistSubscribers extends WatchedList<ArtistId> {
  constructor(initialSubscriber: ArtistId[]) {
    super(initialSubscriber);
  }

  compareItems(a: ArtistId, b: ArtistId): boolean {
    return a.equals(b);
  }

  public static create(initialSubscriber?: ArtistId[]): ArtistSubscribers {
    return new ArtistSubscribers(initialSubscriber ? initialSubscriber : []);
  }
}
