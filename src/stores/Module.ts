import { Module } from '@nestjs/common';
import { AcmeDataStore } from './AcmeDataStore';
import { PaperfliesDataStore } from './PaperfliesDataStore';
import { PatagoniaDataStore } from './PatagoniaDataStore';
import { ProcessedHotelDataStore } from './ProcessedHotelDataStore';

@Module({
  providers: [AcmeDataStore, PaperfliesDataStore, PatagoniaDataStore, ProcessedHotelDataStore],
  exports: [AcmeDataStore, PaperfliesDataStore, PatagoniaDataStore, ProcessedHotelDataStore],
})
export class StoresModule {}
