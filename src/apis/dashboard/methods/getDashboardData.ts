// Importando serviço do prisma
import { PrismaService } from "../../../prisma/prisma.service";
// Importando logger
import { Logger } from "@nestjs/common";
// Criação de logger
const logger = new Logger('getDashboardData'); 
// Importando metodos
import getTotalFarms from '../methods/getTotalFarms';
import getTotalHectares from '../methods/getTotalHectares';
import getFarmsByState from '../methods/getFarmsByState';
import getCropsDistribution from '../methods/getCropsDistribution';
import getLandUsage from '../methods/getLandUsage';

export default async function getDashboardData(prisma: PrismaService) {
    const [totalFarms, totalHectares, farmsByState, cropsDistribution, landUsage] =
        await Promise.all([
          getTotalFarms(prisma),
          getTotalHectares(prisma),
          getFarmsByState(prisma),
          getCropsDistribution(prisma),
          getLandUsage(prisma),
        ]);
    
    return {
      totalFarms: totalFarms.totalFarms,
      totalHectares: totalHectares.totalHectares,
      farmsByState,
      cropsDistribution,
      landUsage,
    }
}