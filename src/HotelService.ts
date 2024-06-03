import { Injectable, NotFoundException } from '@nestjs/common';
import { HotelData, ProcessedHotelDataStore } from './stores/ProcessedHotelDataStore';

@Injectable()
export class HotelService {
  constructor(private readonly processedHotelDataStore: ProcessedHotelDataStore) {}

  async getHotels(): Promise<HotelData[]> {
    return this.processedHotelDataStore.getAll();
  }

  async getHotelById(id: string): Promise<HotelData> {
    const hotel = this.processedHotelDataStore.get(id);

    // Return 404 if the resource is not found - result can be changed depending on the API design.
    // For example, we could return an application error code along with an error message.
    if (!hotel) {
      throw new NotFoundException();
    }

    return hotel;
  }

  async getHotelsByDestination(destinationId: number): Promise<HotelData[]> {
    return this.processedHotelDataStore.getByDestinationId(destinationId);
  }
}
