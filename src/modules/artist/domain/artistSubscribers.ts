import { WatchedList } from "../../../shared/domain/watchedList";

export class ArtistSubscribers extends WatchedList<string> {
  constructor(initialSubscriber: string[]) {
    super(initialSubscriber);
  }

  compareItems(a: string, b: string): boolean {
    return a === b;
  }

  public static create(initialSubscriber?: string[]): ArtistSubscribers {
    return new ArtistSubscribers(initialSubscriber ? initialSubscriber : []);
  }
}
