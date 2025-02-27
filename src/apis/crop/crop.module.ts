import { Module } from '@nestjs/common';
// Importando serviços
import { CropService } from './crop.service';
import { PrismaService } from '../../prisma/prisma.service';
// Importando controllers
import { CropController } from './crop.controller';
// Importando modulos
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  providers: [CropService, PrismaService],
  controllers: [CropController],
  imports: [PrismaModule]
})
export class CropModule {}
