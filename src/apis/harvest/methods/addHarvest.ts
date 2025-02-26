// Importando Dto de adição de nova fazenda
import { AddHarvestDto } from "../../../utils/dtos/harvest/harvest.dto";
// Importando serviço do prisma
import { PrismaService } from "../../../prisma/prisma.service";
// Importando exceçoes
import { NotFoundException, Logger, InternalServerErrorException } from "@nestjs/common";
// Criação de logger
const logger = new Logger('addHarvest'); 

// Devo analisar se posteriormente deveriamos impedir que a mesma fazenda
// Cadastre mais de uma safra por ano.
export default async function addHarvest(prisma: PrismaService, harvestData: AddHarvestDto) {
    const { farmId, year } = harvestData;

    logger.log(`Checking whether the sent farm ID is included in the registers`);

    const farm = await prisma.farm.findUnique({
        where: { id: farmId },
    });

    if (!farm) {
        logger.error('Farm not found');
        throw new NotFoundException('Farm not found');
    }

    try {
        // Cria uma nova safra
        return prisma.harvest.create({
            data: {
            year: year,
            farmId: farmId,
            },
        });
    } catch (err) {
        logger.error(`A fatal error occured when creating harvest -> ${JSON.stringify(err)}`);
        throw new InternalServerErrorException(`A fatal error occured when creating harvest -> ${JSON.stringify(err)}`);
    }

}