// Importando Dto de adição de nova fazenda
import { AddCropDto } from "src/utils/dtos/crop/crop.dto";
// Importando serviço do prisma
import { PrismaService } from "src/prisma/prisma.service";
// Importando exceçoes
import { NotFoundException, BadRequestException, Logger, InternalServerErrorException } from "@nestjs/common";
// Criação de logger
const logger = new Logger('addCrop'); 

export default async function addCrop(prisma: PrismaService, cropData: AddCropDto) {
    const { harvestId } = cropData;

    logger.log('Checking if harvestId sent exists');
}