// Importando serviço do prisma
import { PrismaService } from "../../../prisma/prisma.service";
// Importando exçeções
import { NotFoundException, ConflictException, Logger } from "@nestjs/common";
// Criando novo logger
const logger = new Logger('deleteProducer');

export default async function deleteProducer(prisma: PrismaService, producerId: string) {
    logger.log(`Checking if producer with id ${producerId} exists`);
    // Verifica se o produtor existe
    const existingProducer = await prisma.producer.findUnique({
        where: { id: producerId },
    });

    if (!existingProducer) {
        logger.error(`Producer with id ${producerId} not found`);
        throw new NotFoundException(`Producer with id ${producerId} not found`);
    }

    const associatedFarms = await prisma.farm.count({ where: { producerId } });

    if (associatedFarms > 0) {
        logger.error(`Cannot delete producer with id ${producerId} because there are associated farms/properties.`);
        throw new ConflictException(`Cannot delete producer with id ${producerId} because there are associated farms/properties.`);
    }

    return prisma.producer.delete({ where: { id: producerId } });
}