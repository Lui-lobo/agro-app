// Importando serviço do prisma
import { PrismaService } from "../../../prisma/prisma.service";
// Importando logger
import { Logger } from "@nestjs/common";
// Criação de logger
const logger = new Logger('getTotalFarms'); 

export default async function getTotalFarms(prisma: PrismaService) {
    const totalFarms = await prisma.farm.count();

    logger.log(`Total farm counted: ${totalFarms}`);

    return { totalFarms };
}