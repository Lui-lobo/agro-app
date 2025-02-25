import { Module } from '@nestjs/common';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
// Importando modulos
import { PrismaModule } from '../../prisma/prisma.module';
// Importando serviço
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProducerController],
  providers: [ProducerService, PrismaService]
})
export class ProducerModule {}
