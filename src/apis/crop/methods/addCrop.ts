// Importando Dto de adição de nova fazenda
import { AddCropDto } from "src/utils/dtos/crop/crop.dto";
// Importando serviço do prisma
import { PrismaService } from "src/prisma/prisma.service";
// Importando exceçoes
import { NotFoundException, Logger, InternalServerErrorException } from "@nestjs/common";
// Criação de logger
const logger = new Logger('addCrop'); 

export default async function addCrop(prisma: PrismaService, cropData: AddCropDto) {
    const { harvestId } = cropData;

    logger.log('Checking if harvestId sent exists');

    // Verificar se o produtor existe
    const findHarvest = await prisma.harvest.findUnique({
        where: { id: harvestId },
    });

    if (!findHarvest) {
        logger.error('Harvest not found');
        throw new NotFoundException('Harvest not found');
    }

    try {
        // Cria uma nova cultura
        return prisma.crop.create({
            data: cropData
        });
    } catch (err) {
        logger.error(`A fatal error occured when creating crop -> ${JSON.stringify(err)}`);
        throw new InternalServerErrorException(`A fatal error occured when creating crop -> ${JSON.stringify(err)}`);
    }
}