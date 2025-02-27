import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProducerModule } from './apis/producer/producer.module';
import { FarmModule } from './apis/farm/farm.module';
import { HarvestModule } from './apis/harvest/harvest.module';
import { CropModule } from './apis/crop/crop.module';
import { DashboardModule } from './apis/dashboard/dashboard.module';

@Module({
  imports: [PrismaModule, ProducerModule, FarmModule, HarvestModule, CropModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
