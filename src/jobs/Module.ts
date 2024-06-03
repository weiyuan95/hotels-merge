import { Module, OnModuleInit } from '@nestjs/common';
import { ProcessSupplierData } from './ProcessSupplierData';
import { RetrieveSupplierData } from './RetrieveSupplierData';
import { StoresModule } from '../stores/Module';

@Module({
  imports: [StoresModule],
  providers: [ProcessSupplierData, RetrieveSupplierData],
})
export class JobModule implements OnModuleInit {
  constructor(
    private readonly processSupplierData: ProcessSupplierData,
    private readonly retrieveSupplierData: RetrieveSupplierData
  ) {}

  // On application start, run the jobs
  async onModuleInit() {
    await this.retrieveSupplierData.job();
    await this.processSupplierData.job();
  }
}
