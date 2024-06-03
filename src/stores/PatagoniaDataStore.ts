import { PatagoniaData } from '../suppliers/PatagoniaSupplier';
import { Injectable } from '@nestjs/common';

/**
 * A simple, in-memory store for PatagoniaData implemented with a Map.
 *
 * Since the problem space can scale up really quickly - with multiple suppliers providing data, memory will be a problem.
 * The underlying store can be swapped out for a more robust solution such as a NOSQL database,
 * or a key-value store like Redis depending on the requirements.
 */
@Injectable()
export class PatagoniaDataStore implements Store<PatagoniaData> {
  private readonly store: Map<string, PatagoniaData> = new Map<string, PatagoniaData>();

  getAllIds(): string[] {
    return Array.from(this.store.keys());
  }

  get(id: string): PatagoniaData | undefined {
    return this.store.get(id);
  }
  set(id: string, value: PatagoniaData): void {
    this.store.set(id, value);
  }
}
