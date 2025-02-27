// Importando serviço do prisma
import { PrismaService } from "../../../prisma/prisma.service";
// Importando logger
import { Logger } from "@nestjs/common";
// Criação de logger
const logger = new Logger('getCropsDistribution'); 

export default async function getCropsDistribution(prisma: PrismaService) {
    const crops = await prisma.crop.groupBy({
        by: ['name'],
        _count: { id: true },
    });
  
    const foundedCrops = crops.map((crop) => ({
      crop: crop.name,
      total: crop._count.id,
    }));

    return foundedCrops;
}