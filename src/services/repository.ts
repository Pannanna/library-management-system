export interface Identifiable {
  id: number;
}

export class Repository<T extends Identifiable> {
  private items: Map<number, T> = new Map();

  add(item: T): void {
    this.items.set(item.id, item);
  }

  update(item: T): void {
    if (!this.items.has(item.id)) {
      throw new Error("Nem található elem ezzel az id-val.");
    }
    this.items.set(item.id, item);
  }

  remove(id: number): void {
    this.items.delete(id);
  }

  getById(id: number): T | undefined {
    return this.items.get(id);
  }

  getAll(): T[] {
    return Array.from(this.items.values());
  }
}