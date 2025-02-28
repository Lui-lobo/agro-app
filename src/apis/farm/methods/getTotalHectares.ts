// Importando serviço do prisma
import { PrismaService } from "../../../prisma/prisma.service";
// Importando logger
import { Logger } from "@nestjs/common";
// Criação de logger
const logger = new Logger('getTotalHectares'); 

export default async function getTotalHectares(prisma: PrismaService) {
    const calculate = await prisma.farm.aggregate({
        _sum: { totalArea: true },
    });

    const totalHectares = calculate._sum.totalArea || 0;

    logger.log(`total hectares counted: ${totalHectares}`);
  
    return { totalHectares };
}