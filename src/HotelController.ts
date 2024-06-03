import { Controller, Get, NotFoundException, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { HotelService } from './HotelService';
import { HotelData } from './stores/ProcessedHotelDataStore';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('hotels')
// Cache all GET results with the NestJS default. If necessary we can tweak the cache settings on an individual basis.
@UseInterceptors(CacheInterceptor)
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  getHotels(): Promise<HotelData[]> {
    return this.hotelService.getHotels();
  }

  @Get(':id')
  // No validation since not enough information is known about the id.
  getHotelById(@Param('id') id: string): Promise<HotelData> {
    const hotel = this.hotelService.getHotelById(id);

    if (!hotel) {
      throw new NotFoundException();
    }

    return hotel;
  }

  @Get('destination/:id')
  // Validate that id is a number, since all destination ids are numbers
  getHotelsByDestination(@Param('id', ParseIntPipe) id: number) {
    return this.hotelService.getHotelsByDestination(id);
  }
}
