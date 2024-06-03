import { Module, OnModuleInit } from '@nestjs/common';
import { HotelController } from './HotelController';
import { HotelService } from './HotelService';
import { ScheduleModule } from '@nestjs/schedule';
import { JobModule } from './jobs/Module';
import { StoresModule } from './stores/Module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [HotelController],
  providers: [HotelService],
  imports: [ScheduleModule.forRoot(), CacheModule.register(), StoresModule, JobModule],
})
export class AppModule {}
