import { AcmeDataStore } from '../stores/AcmeDataStore';
import { ProcessedHotelDataStore } from '../stores/ProcessedHotelDataStore';
import { PatagoniaDataStore } from '../stores/PatagoniaDataStore';
import { PaperfliesDataStore } from '../stores/PaperfliesDataStore';
import { HotelDataProcessor } from './HotelDataProcessor';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ProcessSupplierData {
  private readonly logger = new Logger(ProcessSupplierData.name);

  constructor(
    private readonly acmeStore: AcmeDataStore,
    private readonly patagoniaStore: PatagoniaDataStore,
    private readonly paperfliesStore: PaperfliesDataStore,
    private readonly processedHotelDataStore: ProcessedHotelDataStore
  ) {}

  // Processing the supplier data should be done at a less frequent interval than retrieving and storing the supplier data
  @Cron(CronExpression.EVERY_5_MINUTES)
  async job(): Promise<void> {
    this.logger.log('Processing supplier data');
    const allIdentifiers = new Set([
      /**
       * Potentially expensive operation to get all hotel identifiers from the supplier data stores.
       * If this starts to become a bottleneck, we can consider storing the identifiers themselves into a store for
       * faster processing.
       */
      ...this.acmeStore.getAllIds(),
      ...this.paperfliesStore.getAllIds(),
      ...this.patagoniaStore.getAllIds(),
    ]);

    allIdentifiers.forEach((id) => {
      const acmeData = this.acmeStore.get(id);
      const patagoniaData = this.patagoniaStore.get(id);
      const paperfliesData = this.paperfliesStore.get(id);

      if (acmeData === undefined && patagoniaData === undefined && paperfliesData === undefined) {
        /**
         * This is a warning since it is possible that the data is not available.
         *
         * For example, if all hotel IDs are stored separately in another data store, it might not sync up
         * with the supplier data stores. However, the job shouldn't crash, so we just continue to the next ID
         */
        this.logger.warn('No data found for id:', id);
        return;
      }

      try {
        // Attempt to process the data, and skip the processing if an error occurs and move on to the next ID
        this.logger.log(`Processing hotel data for id: ${id}`);
        this.processedHotelDataStore.set(id, new HotelDataProcessor(acmeData, paperfliesData, patagoniaData).process());
      } catch (e: any) {
        this.logger.warn(`Error processing data for id:, ${id} with error ${e.message}`);
      }
    });
    this.logger.log('Processed supplier data');
  }
}
