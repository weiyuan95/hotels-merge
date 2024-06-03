import { Injectable } from '@nestjs/common';
import { HotelData, ProcessedHotelDataStore } from './stores/ProcessedHotelDataStore';

@Injectable()
export class HotelService {
  constructor(private readonly processedHotelDataStore: ProcessedHotelDataStore) {}

  async getHotels(): Promise<HotelData[]> {
    return this.processedHotelDataStore.getAll();
  }

  async getHotelById(id: string): Promise<HotelData | undefined> {
    return this.processedHotelDataStore.get(id);
  }

  async getHotelsByIds(ids: string[]): Promise<HotelData[]> {
    const hotels: HotelData[] = [];

    for (const id of ids) {
      const hotel = await this.getHotelById(id);
      // If nothing is found, we just ignore that particular ID since it's unclear what the
      // behaviour should be.
      if (hotel) {
        hotels.push(hotel);
      }
    }

    return hotels;
  }

  async getHotelsByDestination(destinationId: number): Promise<HotelData[]> {
    return this.processedHotelDataStore.getByDestinationId(destinationId);
  }
}
