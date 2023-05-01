import { WatchedList } from "../../../shared/domain/watchedList";

export class ArtistSubscribe extends WatchedList<string> {
  constructor(initialSubscriber: string[]) {
    super(initialSubscriber);
  }

  compareItems(a: string, b: string): boolean {
    return a === b;
  }

  public static create(initialSubscriber?: string[]): ArtistSubscribe {
    return new ArtistSubscribe(initialSubscriber ? initialSubscriber : []);
  }
}
