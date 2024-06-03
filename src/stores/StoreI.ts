interface Store<T> {
  get(id: string): T | undefined;
  set(id: string, value: T): void;
  getAllIds(): string[];
}
