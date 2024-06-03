import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { HotelService } from './HotelService';
import { HotelData } from './stores/ProcessedHotelDataStore';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('hotels')
// Cache all GET results with the NestJS default. If necessary we can tweak the cache settings on an individual basis.
@UseInterceptors(CacheInterceptor)
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  // It's not clear what the expected behaviour is when an ID isn't found, so we're just not returning anything
  // for non-existent IDs
  @Get()
  async findHotelsByIds(
    @Query('ids', new ParseArrayPipe({ items: String, separator: ',', optional: true }))
    ids: string[]
  ): Promise<HotelData[]> {
    if (!ids) {
      return this.hotelService.getHotels();
    }

    return this.hotelService.getHotelsByIds(ids);
  }

  @Get(':id')
  // No validation since not enough information is known about the id.
  async getHotelById(@Param('id') id: string): Promise<HotelData> {
    const hotel = await this.hotelService.getHotelById(id);

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
