import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProducerModule } from './apis/producer/producer.module';

@Module({
  imports: [PrismaModule, ProducerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
