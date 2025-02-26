import { Injectable } from '@nestjs/common';
// Importando Serviços
import { PrismaService } from '../../prisma/prisma.service';
// Importando DTOs
import { AddHarvestDto } from '../../utils/dtos/harvest/harvest.dto';
// Importando metodos
import addHarvest from './methods/addHarvest';

@Injectable()
export class HarvestService {
    constructor(private readonly prisma: PrismaService) {}
    
    async add(harvestData: AddHarvestDto) {
        return await addHarvest(this.prisma, harvestData);
    }
}
