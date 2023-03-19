export class Identify<T> {
  constructor(private value: T) {}
  equals(id?: Identify<T>): boolean {
    if (id == null) {
      return false;
    }

    if (!(id instanceof this.constructor)) {
      return false;
    }

    return id.toValue() === this.value;
  }

  toValue(): T {
    return this.value;
  }
  toString() {
    return String(this.value);
  }
}
