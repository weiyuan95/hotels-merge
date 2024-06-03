import { PaperfliesData } from '../suppliers/PaperfliesSupplier';
import { Injectable } from '@nestjs/common';

/**
 * A simple, in-memory store for PaperfliesData implemented with a Map.
 *
 * Since the problem space can scale up really quickly - with multiple suppliers providing data, memory will be a problem.
 * The underlying store can be swapped out for a more robust solution such as a NOSQL database,
 * or a key-value store like Redis depending on the requirements.
 */
@Injectable()
export class PaperfliesDataStore implements Store<PaperfliesData> {
  private readonly store: Map<string, PaperfliesData> = new Map<string, PaperfliesData>();

  getAllIds(): string[] {
    return Array.from(this.store.keys());
  }

  get(id: string): PaperfliesData | undefined {
    return this.store.get(id);
  }
  set(id: string, value: PaperfliesData): void {
    this.store.set(id, value);
  }
}
