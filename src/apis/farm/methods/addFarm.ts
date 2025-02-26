// Importando Dto de adição de nova fazenda
import { AddFarmDto } from "src/utils/dtos/farms/farms.dto";
// Importando serviço do prisma
import { PrismaService } from "src/prisma/prisma.service";
// Importando exceçoes
import { NotFoundException, BadRequestException, Logger, InternalServerErrorException } from "@nestjs/common";
// Criação de logger
const logger = new Logger('addFarm'); 

export default async function addFarm(prisma: PrismaService, farmData: AddFarmDto) {
    const { producerId, totalArea, arableArea, vegetationArea } = farmData;

    logger.log('Checking if producerId sent exists');

    // Verificar se o produtor existe
    const producerExists = await prisma.producer.findUnique({
        where: { id: producerId },
    });

    if (!producerExists) {
        logger.error('Producer not found');
        throw new NotFoundException('Producer not found');
    }

    // Garantir que a soma da área agricultável e vegetação não ultrapasse a total
    if (arableArea + vegetationArea > totalArea) {
        logger.error('The sum of arable and vegetation areas cannot exceed the total area');
        throw new BadRequestException('The sum of arable and vegetation areas cannot exceed the total area');
    }

    try {
        return prisma.farm.create({ data: farmData });
    } catch (err) {
        logger.error('Fatal error occurred while adding a new farm to the producer.');
        throw new InternalServerErrorException('Fatal error occurred while adding a new farm to the producer.');
    }
    
}