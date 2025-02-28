import { Injectable } from '@nestjs/common';
// Importando Serviços
import { PrismaService } from '../../prisma/prisma.service';
// Importando DTOs
import { AddCropDto } from '../../utils/dtos/crop/crop.dto';
// Importando metodos
import addCrop from './methods/addCrop';
import getCropsDistribution from './methods/getCropsDistribution';

@Injectable()
export class CropService {
    constructor(private readonly prisma: PrismaService) {}

    async addCrop(cropData: AddCropDto) {
        return await addCrop(this.prisma, cropData);
    }

     async getCropsDistribution() {
        return await getCropsDistribution(this.prisma);
    }
}
