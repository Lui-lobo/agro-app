import { Module } from '@nestjs/common';
// Importando Serviços
import { HarvestService } from './harvest.service';
import { PrismaService } from '../../prisma/prisma.service';
// Importando controllers
import { HarvestController } from './harvest.controller';
// Importando modulos
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  providers: [HarvestService, PrismaService],
  controllers: [HarvestController],
  imports: [PrismaModule]
})
export class HarvestModule {}
