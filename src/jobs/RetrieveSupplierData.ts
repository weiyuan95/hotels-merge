import { AcmeSupplier } from '../suppliers/AcmeSupplier';
import { AcmeDataStore } from '../stores/AcmeDataStore';
import { PatagoniaSupplier } from '../suppliers/PatagoniaSupplier';
import { PatagoniaDataStore } from '../stores/PatagoniaDataStore';
import { PaperfliesSupplier } from '../suppliers/PaperfliesSupplier';
import { PaperfliesDataStore } from '../stores/PaperfliesDataStore';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RetrieveSupplierData {
  private readonly acmeSupplier = new AcmeSupplier();
  private readonly patagoniaSupplier = new PatagoniaSupplier();
  private readonly paperfliesSupplier = new PaperfliesSupplier();
  private readonly logger = new Logger(RetrieveSupplierData.name);

  constructor(
    private readonly acmeStore: AcmeDataStore,
    private readonly patagoniaStore: PatagoniaDataStore,
    private readonly paperfliesStore: PaperfliesDataStore
  ) {}

  /**
   * Although we're putting them all together for simplicity, these can be broken down into separate jobs
   * depending on the necessary update frequency.
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async job(): Promise<void> {
    this.logger.log('Retrieving supplier data');
    await Promise.all([this.persistAcmeData(), this.persistPatagoniaData(), this.persistPaperfliesData()]);
    this.logger.log('Retrieved supplier data ');
  }

  async persistAcmeData(): Promise<void> {
    const acmeData = await this.acmeSupplier.getAcmeData();
    acmeData.forEach((data) => {
      this.acmeStore.set(data.Id, data);
    });
  }

  async persistPatagoniaData(): Promise<void> {
    const patagoniaData = await this.patagoniaSupplier.getPatagoniaData();
    patagoniaData.forEach((data) => {
      this.patagoniaStore.set(data.id, data);
    });
  }

  async persistPaperfliesData(): Promise<void> {
    const paperfliesData = await this.paperfliesSupplier.getPaperfliesData();
    paperfliesData.forEach((data) => {
      this.paperfliesStore.set(data.hotel_id, data);
    });
  }
}
