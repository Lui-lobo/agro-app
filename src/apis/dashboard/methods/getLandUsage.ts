// Importando serviço do prisma
import { PrismaService } from "../../../prisma/prisma.service";
// Importando logger
import { Logger } from "@nestjs/common";
// Criação de logger
const logger = new Logger('getLandUsage'); 

export default async function getLandUsage(prisma: PrismaService) {
    const landUsage = await prisma.farm.aggregate({
        _sum: {
          arableArea: true,
          vegetationArea: true,
        },
    });

    const arableArea = landUsage._sum.arableArea || 0;
    const vegetationArea = landUsage._sum.vegetationArea || 0

    logger.log(`Arable area calculated: ${arableArea}, Vegetation area calculated: ${vegetationArea}`);
  
    return {
      arableArea,
      vegetationArea
    };
}