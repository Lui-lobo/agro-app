import { Module } from '@nestjs/common';
// Importando serviços
import { FarmService } from './farm.service';
import { PrismaService } from '../../prisma/prisma.service';
// Importando controllers
import { FarmController } from './farm.controller';
// Importando modulos
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  providers: [FarmService, PrismaService],
  controllers: [FarmController],
  imports: [PrismaModule]
})
export class FarmModule {}
