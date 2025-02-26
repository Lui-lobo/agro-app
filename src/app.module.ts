import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProducerModule } from './apis/producer/producer.module';
import { FarmModule } from './apis/farm/farm.module';

@Module({
  imports: [PrismaModule, ProducerModule, FarmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
