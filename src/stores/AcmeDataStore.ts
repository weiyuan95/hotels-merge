import { AcmeData } from '../suppliers/AcmeSupplier';
import { Injectable } from '@nestjs/common';

/**
 * A simple, in-memory store for AcmeData implemented with a Map.
 *
 * Since the problem space can scale up really quickly - with multiple suppliers providing data, memory will be a problem.
 * The underlying store can be swapped out for a more robust solution such as a NOSQL database,
 * or a key-value store like Redis depending on the requirements.
 */
@Injectable()
export class AcmeDataStore implements Store<AcmeData> {
  private readonly store: Map<string, AcmeData> = new Map<string, AcmeData>();

  getAllIds(): string[] {
    return Array.from(this.store.keys());
  }

  get(id: string): AcmeData | undefined {
    return this.store.get(id);
  }
  set(id: string, value: AcmeData): void {
    this.store.set(id, value);
  }
}
