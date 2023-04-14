export abstract class WatchedList<T> {
  public currentItems: T[];
  private initial: T[];
  private new: T[];
  private removed: T[];

  constructor(initialItems?: T[]) {
    this.currentItems = initialItems ? initialItems : [];
    this.initial = initialItems ? initialItems : [];
    this.new = [];
    this.removed = [];
  }

  abstract compareItems(a: T, b: T): boolean;

  public getItems(): T[] {
    return this.currentItems;
  }

  public getNewItems(): T[] {
    return this.new;
  }

  public getRemovedItems(): T[] {
    return this.removed;
  }

  private isCurrentItem(item: T): boolean {
    return (
      this.currentItems.filter((i) => this.compareItems(item, i)).length !== 0
    );
  }

  private isNewItem(item: T): boolean {
    return this.new.filter((i) => this.compareItems(item, i)).length !== 0;
  }

  private isRemovedItem(item: T): boolean {
    return this.removed.filter((i) => this.compareItems(item, i)).length !== 0;
  }

  private removeFromNew(item: T): void {
    this.new = this.new.filter((i) => !this.compareItems(item, i));
  }
  private removeFromCurrent(item: T): void {
    this.currentItems = this.currentItems.filter(
      (i) => !this.compareItems(item, i)
    );
  }
  private removeFromRemoved(item: T): void {
    this.removed = this.removed.filter((i) => !this.compareItems(item, i));
  }

  private wasAddedInitially(item: T): boolean {
    return this.initial.filter((i) => this.compareItems(item, i)).length !== 0;
  }

  public exists(item: T): boolean {
    return this.isCurrentItem(item);
  }

  public add(item: T): void {
    if (this.isRemovedItem(item)) {
      this.removeFromRemoved(item);
    }
    if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
      this.new.push(item);
    }
    if (!this.isCurrentItem(item)) {
      this.currentItems.push(item);
    }
  }

  public remove(item: T): void {
    this.removeFromCurrent(item);
    if (this.isNewItem(item)) {
      this.removeFromNew(item);
      return;
    }
    if (!this.isRemovedItem(item)) {
      this.removed.push(item);
    }
  }
  public removeLs(item: T[]): void {
    item.forEach((c) => {
      this.removeFromCurrent(c);

      if (this.isNewItem(c)) {
        this.removeFromNew(c);
        return;
      }
      if (!this.isRemovedItem(c)) {
        this.removed.push(c);
      }
    });
  }
}
