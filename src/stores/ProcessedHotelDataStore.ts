import { Injectable } from '@nestjs/common';

export interface HotelData {
  id: string;
  destination_id: number;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    country: string;
  };
  description: string;
  amenities: {
    general: string[];
    room: string[];
  };
  images: {
    rooms: { link: string; description: string }[];
    site: { link: string; description: string }[];
    amenities: { link: string; description: string }[];
  };
  booking_conditions: string[];
}

/**
 * A simple, in-memory store for ProcessedHotelData implemented with a Map.
 *
 * For this store, we actually want to persist the data properly, since this is what is read
 * from to return the processed hotel data. A NOSQL database like Mongo would make sense since the
 * data is non-relational and are essentially individual documents of hotel data.
 */
@Injectable()
export class ProcessedHotelDataStore implements Store<HotelData> {
  private readonly store: Map<string, HotelData> = new Map<string, HotelData>();

  getAllIds(): string[] {
    // Not necessary for this store
    throw new Error('Method not implemented.');
  }

  getByDestinationId(destinationId: number): HotelData[] {
    // Scan each hotel data to find the one with the matching destination ID
    // Ideally should be done with a database query instead of doing an O(N) scan.
    const results = [];

    for (const hotel of this.getAll()) {
      if (hotel.destination_id === destinationId) {
        results.push(hotel);
      }
    }

    return results;
  }

  getAll(): HotelData[] {
    return Array.from(this.store.values());
  }

  get(id: string): HotelData | undefined {
    return this.store.get(id);
  }

  set(id: string, value: HotelData): void {
    this.store.set(id, value);
  }
}
