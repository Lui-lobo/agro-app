import { Module } from '@nestjs/common';
// Importando serviços
import { DashboardService } from './dashboard.service';
import { PrismaService } from '../../prisma/prisma.service';
// Importando controller
import { DashboardController } from './dashboard.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  providers: [DashboardService, PrismaService],
  controllers: [DashboardController],
  imports: [PrismaModule]
})
export class DashboardModule {}
